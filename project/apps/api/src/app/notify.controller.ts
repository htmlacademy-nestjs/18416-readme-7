import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Inject,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ApplicationServiceURL, rabbitConfig } from '@project/api-config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RabbitRouting } from '@project/shared/core';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { InjectAxiosAuthorization } from '@project/interceptors';

@Controller('notify')
@UseInterceptors(InjectAxiosAuthorization)
@UseFilters(AxiosExceptionFilter)
export class NotifyController {
  constructor(
    private readonly httpService: HttpService,
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  @UseGuards(CheckAuthGuard)
  @Get('/new-posts-appeared')
  public async newPostsAppeared() {
    const { data: lastNewsletter } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Notify}/get-last-newsletter`
    );

    const { data: posts } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}/find-after-date`,
      {
        params: { date: lastNewsletter.lastMailingDate },
      }
    );

    this.rabbitClient.publish<any>(
      this.rabbiOptions.exchange,
      RabbitRouting.NewPostsAppeared,
      posts
    );
  }
}
