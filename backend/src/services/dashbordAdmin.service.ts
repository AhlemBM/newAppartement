import { Request, Response } from 'express';
import { AppDataSource } from '../orm/data-source';
import { UserEntity } from '../orm/entities/user.entity';
import { AppartementEntity } from '../orm/entities/appartement.entity';
import { ChekinEntity} from '../orm/entities/checkin.entity';

const userRepository = AppDataSource.getRepository(UserEntity);
const appartementRepository = AppDataSource.getRepository(AppartementEntity);
const reservationRepository = AppDataSource.getRepository(ChekinEntity);

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const userCount = await userRepository.count();
        const appartementCount = await appartementRepository.count();


        const reservationData = await reservationRepository.count();

        return res.status(200).json({
            success: true,
            data: {
                userCount,
                appartementCount,
                reservationData,
            },
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
    }
};
