import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner, PartnerCategory } from './partner.entity';
import { CreatePartnerDto, UpdatePartnerDto } from './partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async findAll(options?: { category?: PartnerCategory; activeOnly?: boolean }): Promise<Partner[]> {
    const query = this.partnerRepository.createQueryBuilder('partner');

    if (options?.category && options.category !== ('all' as any)) {
      query.andWhere('partner.category = :category', { category: options.category });
    }

    if (options?.activeOnly) {
      query.andWhere('partner.isActive = :isActive', { isActive: true });
    }

    query.orderBy('partner.sortOrder', 'ASC').addOrderBy('partner.createdAt', 'DESC');

    return query.getMany();
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException(`Partner with ID "${id}" not found`);
    }
    return partner;
  }

  async create(createDto: CreatePartnerDto): Promise<Partner> {
    const partner = this.partnerRepository.create(createDto);
    return this.partnerRepository.save(partner);
  }

  async update(id: string, updateDto: UpdatePartnerDto): Promise<Partner> {
    const partner = await this.findOne(id);
    Object.assign(partner, updateDto);
    return this.partnerRepository.save(partner);
  }

  async remove(id: string): Promise<{ success: boolean; message: string }> {
    const partner = await this.findOne(id);
    await this.partnerRepository.remove(partner);
    return { success: true, message: `Deleted partner ${id}` };
  }
}
