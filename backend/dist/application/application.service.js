"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("./entities/application.entity");
const job_entity_1 = require("../job/entities/job.entity");
let ApplicationService = class ApplicationService {
    constructor(applicationRepository, jobRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }
    async create(jobId, candidateName, phone, email, coverLetter, cvUrl) {
        const job = await this.jobRepository.findOne({ where: { id: jobId } });
        if (!job) {
            throw new common_1.NotFoundException(`Job with ID ${jobId} not found`);
        }
        const application = this.applicationRepository.create({
            candidateName,
            phone,
            email,
            coverLetter,
            cvUrl,
            job,
        });
        return this.applicationRepository.save(application);
    }
    async findAll(jobId) {
        const query = this.applicationRepository.createQueryBuilder('application')
            .leftJoinAndSelect('application.job', 'job')
            .orderBy('application.createdAt', 'DESC');
        if (jobId) {
            query.where('job.id = :jobId', { jobId });
        }
        return query.getMany();
    }
    async updateStatus(id, status) {
        const application = await this.applicationRepository.findOne({ where: { id } });
        if (!application) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
        application.status = status;
        return this.applicationRepository.save(application);
    }
    async updateNote(id, hrNote) {
        const application = await this.applicationRepository.findOne({ where: { id } });
        if (!application) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
        application.hrNote = hrNote;
        return this.applicationRepository.save(application);
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.JobApplication)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.JobPosting)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ApplicationService);
//# sourceMappingURL=application.service.js.map