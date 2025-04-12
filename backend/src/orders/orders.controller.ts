import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthenticationGuard } from 'src/utility/common/guards/authentication.guard';
import { CurrentUser } from 'src/utility/common/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { AuthorizeGuard } from 'src/utility/common/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { OrderedProductsDto } from './dto/ordered-products.dto';
import { CreateShippingDto } from './dto/create-shipping.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description:
      'The order has been successfully created.',
    type: OrderEntity,
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<OrderEntity | null> {
    return await this.ordersService.create(
      createOrderDto,
      currentUser,
    );
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of orders.',
    type: [OrderEntity],
  })
  async findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<OrderEntity[]> {
    return await this.ordersService.findAll(
      limit,
      offset,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the order details.',
    type: OrderEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderEntity> {
    return await this.ordersService.findOne(id);
  }

  @UseGuards(
    AuthenticationGuard,
    AuthorizeGuard([Roles.ADMIN]),
  )
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update an order status',
  })
  @ApiResponse({
    status: 200,
    description:
      'The order status has been successfully updated.',
    type: OrderEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateOrderStatusDto: UpdateOrderStatusDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.update(
      id,
      updateOrderStatusDto,
      currentUser,
    );
  }

  @UseGuards(
    AuthenticationGuard,
    AuthorizeGuard([Roles.ADMIN]),
  )
  @Put('cancel/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cancel an order by ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'The order has been successfully cancelled.',
    type: OrderEntity,
  })
  async cancelledOrder(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.cancelled(
      id,
      currentUser,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an order by ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'The order has been successfully deleted.',
    type: OrderEntity,
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.ordersService.remove(id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('cart/mine')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get the current user’s cart',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns the current user’s cart.',
    type: CreateCartDto,
  })
  async getCart(
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.ordersService.getOrCreateUserCart(
      currentUser.id,
    );
  }

  @UseGuards(AuthenticationGuard)
  @Post('cart')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add a product to the cart',
  })
  @ApiResponse({
    status: 201,
    description:
      'The product has been successfully added to the cart.',
    type: OrderedProductsDto,
  })
  async addProductToCart(
    @Body()
    orderedProductsDto: OrderedProductsDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.addProductToCart(
      orderedProductsDto,
      currentUser,
    );
  }

  @UseGuards(AuthenticationGuard)
  @Delete('cart/remove/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove a product from the cart',
  })
  @ApiResponse({
    status: 200,
    description:
      'The product has been successfully removed from the cart.',
  })
  async removeProductFromCart(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.ordersService.removeProductFromCart(
      id,
      currentUser,
    );
  }

  @UseGuards(AuthenticationGuard)
  @Post('cart/checkout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Checkout the cart' })
  @ApiResponse({
    status: 201,
    description:
      'The cart has been successfully checked out.',
  })
  async checkout(
    @Body() createShippingDto: CreateShippingDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.checkout(
      createShippingDto,
      currentUser,
    );
  }
}
