import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {

  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}
  // create(createSeriesDto: CreateSeriesDto) {
  //   return 'This action adds a new series';
  // }
  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const existe = await this.seriesRepository.findOneBy({
      titulo: createSeriesDto.titulo.trim(),
      sinopsis: createSeriesDto.sinopsis.trim(),
      director: createSeriesDto.director.trim(),
      temporadas: createSeriesDto.temporadas,
      fechaEstreno: createSeriesDto.fechaEstreno,
      //tipoclasificacion: createSeriesDto.tipoClasificacion,
    });

    if (existe) throw new ConflictException('La serie ya existe');

    const serie = new Series();
    serie.titulo = createSeriesDto.titulo.trim();
    serie.sinopsis = createSeriesDto.sinopsis.trim();
    serie.director = createSeriesDto.director.trim();
    serie.temporadas = createSeriesDto.temporadas;
    serie.fechaEstreno = createSeriesDto.fechaEstreno;
    //serie.tipoclasificacion = createSeriesDto.tipoClasificacion;
    return this.seriesRepository.save(serie);
  }
  // findAll() {
  //   return `This action returns all series`;
  // }
  async findAll(): Promise<Series[]> {
    return this.seriesRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} series`;
  // }
  async findOne(id: number): Promise<Series> {
    const serie = await this.seriesRepository.findOneBy({ id });
    if (!serie) throw new NotFoundException('la serie no existe');
    return serie;
  }

  // update(id: number, updateSeriesDto: UpdateSeriesDto) {
  //   return `This action updates a #${id} series`;
  // }
  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    const serie = await this.findOne(id);
    const serieUpdate = Object.assign(serie, updateSeriesDto);
    return this.seriesRepository.save(serieUpdate);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} series`;
  // }
  async remove(id: number) {
    const serie = await this.findOne(id);
    return this.seriesRepository.softRemove(serie);
  }
}
