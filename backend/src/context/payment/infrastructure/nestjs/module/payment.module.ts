import { Module } from '@nestjs/common';
import { CreatePaymentService } from 'src/context/payment/application/create/create.service';
import { DeletePaymentService } from 'src/context/payment/application/delete/delete.service';
import { FindAllPaymentService } from 'src/context/payment/application/findAll/findAll.service';
import { FindByIdPaymentService } from 'src/context/payment/application/findById/findById.service';
import { PaymentExternalRepository } from '../../repository/paymentExternal.repository';
import { PaymentRepository } from 'src/context/payment/domain/repository/payment.repository';
import { RelationsRepository } from '../../repository/relations.repository';
import { DbRepository } from '../../typeorm/repository/db.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../../typeorm/entitie/payment.entitie';
import { GenerateToken } from 'src/context/auth/infrastructure/generateToken/generateToken';
import { CreatePaymentController } from '../controllers/V1/create/create.controller';
import { DeletePaymentController } from '../controllers/V1/delete/delete.controller';
import { FindAllPaymentController } from '../controllers/V1/findAll/findAll.controller';
import { FindByIdPaymentController } from '../controllers/V1/findById/findById.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [
    CreatePaymentController,
    FindAllPaymentController,
    FindByIdPaymentController,
    DeletePaymentController,
  ],
  providers: [
    CreatePaymentService,
    DeletePaymentService,
    FindAllPaymentService,
    FindByIdPaymentService,
    PaymentExternalRepository,
    RelationsRepository,
    DbRepository,
    GenerateToken,
    {
      provide: PaymentRepository,
      useExisting: PaymentExternalRepository,
    },
  ],
})
export class PaymentModule {}
