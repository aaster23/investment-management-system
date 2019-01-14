import { Company } from './company.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';

@Entity({
  name: 'prices',
})
export class Price {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  opendate: Date;

  @Column()
  startprice: number;

  @Column()
  endprice: number;

  @Column()
  highprice: number;

  @Column()
  lowprice: number;

  @ManyToOne(type => Company, company => company.prices)
  company: Promise<Company>;

}