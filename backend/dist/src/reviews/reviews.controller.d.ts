import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from './../users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity>;
    findAll(): Promise<ReviewEntity[]>;
    findAllByProduct(productId: number): Promise<ReviewEntity[]>;
    findOne(id: string): Promise<ReviewEntity>;
    update(id: string, updateReviewDto: UpdateReviewDto, currentUser: UserEntity): Promise<ReviewEntity>;
    remove(id: string): Promise<ReviewEntity>;
}
