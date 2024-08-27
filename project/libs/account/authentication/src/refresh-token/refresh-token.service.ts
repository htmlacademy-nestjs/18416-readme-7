import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { RefreshTokenPayload } from '@project/shared/core';
import { parseTime } from '@project/helpers';

import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenParams } from '../authentication.enum';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const timeValue = parseTime(RefreshTokenParams.REFRESH_TOKEN_EXPIRES_IN);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string): Promise<void> {
    await this.deleteExpiredRefreshTokens();
    await this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(
      tokenId
    );
    return refreshToken !== null;
  }

  public async deleteExpiredRefreshTokens() {
    await this.refreshTokenRepository.deleteExpiredTokens();
  }
}
