interface HealthBenefit {
  title: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  healthBenefits: HealthBenefit[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Hydrating Face Cream+",
    category: "Skincare",
    description:
      "A lightweight moisturizer that hydrates and nourishes the skin with natural ingredients.",
    price: 19.99,
    image: "/images/product/1.png",
    healthBenefits: [
      {
        title: "Deep Hydration",
        description: "Provides 24-hour moisture retention for all skin types"
      },
      {
        title: "Skin Barrier Protection",
        description: "Strengthens the skin's natural barrier against environmental damage"
      },
      {
        title: "Anti-Aging Properties",
        description: "Contains antioxidants that help reduce fine lines and wrinkles"
      }
    ]
  },
  {
    id: 2,
    name: "Deep Clean Face Wash",
    category: "Cleanser",
    description:
      "A gentle cleanser that removes dirt, oil, and impurities for a fresh, clean feel.",
    price: 14.99,
    image: "/images/product/2.png",
    healthBenefits: [
      {
        title: "Gentle Cleansing",
        description: "Removes impurities without stripping natural oils"
      },
      {
        title: "Pore Refinement",
        description: "Helps minimize the appearance of pores for smoother skin"
      },
      {
        title: "Acne Prevention",
        description: "Contains salicylic acid to prevent breakouts and blemishes"
      }
    ]
  },
  {
    id: 3,
    name: "Silky Smooth Shampoo",
    category: "Hair Care",
    description:
      "A sulfate-free shampoo that cleanses while keeping hair soft, shiny, and manageable.",
    price: 12.99,
    image: "/images/product/3.png",
    healthBenefits: [
      {
        title: "Sulfate-Free Formula",
        description: "Gentle on scalp and hair, preventing dryness and irritation"
      },
      {
        title: "Hair Strengthening",
        description: "Contains biotin and keratin to strengthen hair from root to tip"
      },
      {
        title: "Color Protection",
        description: "Helps maintain hair color vibrancy and prevents fading"
      }
    ]
  },
  {
    id: 4,
    name: "Ultra Repair Conditioner",
    category: "Hair Care",
    description:
      "A deep conditioning treatment for dry and damaged hair that restores moisture and shine.",
    price: 15.99,
    image: "/images/product/4.png",
    healthBenefits: [
      {
        title: "Deep Conditioning",
        description: "Penetrates deep into hair shaft for lasting moisture"
      },
      {
        title: "Damage Repair",
        description: "Repairs split ends and strengthens damaged hair fibers"
      },
      {
        title: "Heat Protection",
        description: "Provides thermal protection for styling and heat tools"
      }
    ]
  },
  {
    id: 5,
    name: "Vitamin C Serum",
    category: "Skincare",
    description:
      "A powerful antioxidant serum that brightens skin and protects against free radical damage.",
    price: 24.99,
    image: "/images/product/5.png",
    healthBenefits: [
      {
        title: "Brightening Effect",
        description: "Reduces dark spots and evens skin tone for radiant complexion"
      },
      {
        title: "Collagen Production",
        description: "Stimulates collagen synthesis for firmer, younger-looking skin"
      },
      {
        title: "UV Protection",
        description: "Provides additional protection against sun damage and aging"
      }
    ]
  },
  {
    id: 6,
    name: "Natural Hair Oil",
    category: "Hair Care",
    description:
      "A lightweight hair oil that nourishes, protects, and adds shine without weighing hair down.",
    price: 18.99,
    image: "/images/product/6.png",
    healthBenefits: [
      {
        title: "Scalp Nourishment",
        description: "Promotes healthy scalp and encourages hair growth"
      },
      {
        title: "Frizz Control",
        description: "Tames frizz and flyaways for smooth, manageable hair"
      },
      {
        title: "Split End Prevention",
        description: "Seals hair cuticles to prevent breakage and split ends"
      }
    ]
  }
];
