import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

export interface CreateContactDto {
  fullName: string;
  phone: string;
  email?: string;
  service?: string;
  projectLocation?: string;
  message?: string;
}

export interface UpdateContactDto {
  status?: 'new' | 'contacted' | 'quoted' | 'completed' | 'cancelled';
  notes?: string;
}

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Không tìm thấy yêu cầu liên hệ #${id}`);
    }
    return contact;
  }

  async create(dto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create({
      fullName: dto.fullName,
      phone: dto.phone,
      email: dto.email || '',
      service: dto.service || 'ceiling',
      projectLocation: dto.projectLocation || '',
      message: dto.message || '',
      status: 'new',
    });
    return this.contactRepository.save(contact);
  }

  async update(id: string, dto: UpdateContactDto): Promise<Contact> {
    const contact = await this.findOne(id);
    if (dto.status) contact.status = dto.status;
    if (dto.notes !== undefined) contact.notes = dto.notes;
    return this.contactRepository.save(contact);
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const contact = await this.findOne(id);
    await this.contactRepository.remove(contact);
    return { success: true, message: 'Đã xóa yêu cầu liên hệ' };
  }

  async count(): Promise<number> {
    return this.contactRepository.count();
  }

  async countNew(): Promise<number> {
    return this.contactRepository.count({ where: { status: 'new' } });
  }
}
