import {Body, Injectable, NotFoundException, ValidationPipe} from '@nestjs/common';
import {CreateServiceDto} from './dto/create-service.dto';
import {UpdateServiceDto} from './dto/update-service.dto';
import {ServiceRepository} from "./service.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Service} from "./entities/service.entity";
import {CategoryRepository} from "../categories/category.repository";

@Injectable()
export class ServicesService {

    constructor(
        @InjectRepository(ServiceRepository)
        private serviceRepository: ServiceRepository,
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
    ) {
    }

    async create(@Body(ValidationPipe) createServiceDto: CreateServiceDto): Promise<Service> {

        const category = await this.categoryRepository.findOne({
            where: {
                id: createServiceDto.categoryId,
            },
        });
        const service = this.serviceRepository.create({
            ...createServiceDto,
            category,
        });
        await this.serviceRepository.save(service);

        return service;

    }

    async findAll(): Promise<Service[]> {

        return await this.serviceRepository.find();
    }

    async findOne(id: number): Promise<Service> {

        const service = await this.serviceRepository.findOne({
            where: {
                id: id,
            },
        })
        if (!service) {
            throw new NotFoundException(`Service not found`);
        }
        return service;
    }

    async update(@Body(ValidationPipe) id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {

        const category = await this.categoryRepository.findOne({
            where: {
                id: updateServiceDto.categoryId,
            },
        });

        await this.serviceRepository.update(id, {
            ...updateServiceDto, category
        });

        const service = this.findOne(id)

        if (!service) {
            throw new NotFoundException(`Service not found`);
        }
        return service;
    }

    async remove(id: number): Promise<void> {

        const result = await this.serviceRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Could not delete, Service not found`);
        }
    }
}
