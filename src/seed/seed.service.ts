import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // const insertPromiseArray = [];
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach((pokemon) => {
      const name = pokemon.name;
      const segment = pokemon.url.split('/');
      const no = +segment[segment.length - 2];

      // const pokemons = await this.pokemonModel.create({ name, no });
      // insertPromiseArray.push(this.pokemonModel.create({ name, no }));

      pokemonToInsert.push({ name, no });
    });

    // await Promise.all(insertPromiseArray);
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
