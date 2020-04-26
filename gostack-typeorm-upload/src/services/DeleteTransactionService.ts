import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<boolean> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const { affected } = await transactionsRepository.delete(id);

    if (!affected) {
      throw new AppError('Transaction not found', 404);
    }

    return true;
  }
}

export default DeleteTransactionService;
