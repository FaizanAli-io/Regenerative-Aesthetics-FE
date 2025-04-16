const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const rootDir = path.resolve(__dirname, 'src'); // Change if needed
const dbDir = path.resolve(__dirname, 'db');

function processFile(filePath) {
  const source = fs.readFileSync(
    filePath,
    'utf-8',
  );
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.ESNext,
    true,
  );

  let updated = false;
  const result = ts.transform(sourceFile, [
    (context) => {
      const visit = (node) => {
        if (
          ts.isImportDeclaration(node) &&
          ts.isStringLiteral(node.moduleSpecifier)
        ) {
          const importPath =
            node.moduleSpecifier.text;
          if (
            importPath.startsWith('src/') ||
            importPath.startsWith('db/')
          ) {
            const absImportPath = path.resolve(
              __dirname,
              importPath,
            );
            const relativePath =
              './' +
              path
                .relative(
                  path.dirname(filePath),
                  absImportPath,
                )
                .replace(/\\/g, '/');
            const newText = relativePath.replace(
              /(\/index)?(\.ts)?$/,
              '',
            );

            updated = true;
            return ts.factory.updateImportDeclaration(
              node,
              node.modifiers,
              node.importClause,
              ts.factory.createStringLiteral(
                newText,
              ),
              node.assertClause,
            );
          }
        }
        return ts.visitEachChild(
          node,
          visit,
          context,
        );
      };
      return (node) => ts.visitNode(node, visit);
    },
  ]);

  if (updated) {
    const printer = ts.createPrinter();
    const newSource = printer.printFile(
      result.transformed[0],
    );
    fs.writeFileSync(
      filePath,
      newSource,
      'utf-8',
    );
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory())
      walkDir(full);
    else if (full.endsWith('.ts'))
      processFile(full);
  }
}

walkDir(rootDir);
walkDir(dbDir);
