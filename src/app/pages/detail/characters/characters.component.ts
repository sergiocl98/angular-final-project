import { CharactersResponse, CharacterData} from './../../../core/services/models/anime-characters';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from './../../../core/services/anime.service';
import { EpisodeData, EpisodeResponse } from './../../../core/services/models/anime-episodes';
import { Component, OnInit } from '@angular/core';
import { getLocaleNumberSymbol } from '@angular/common';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  public id?: string;
  characterData?: CharacterData[];
  charactersResponse?: CharactersResponse;

  public showCharacters: boolean = false;

  constructor(private route: ActivatedRoute,private animeService: AnimeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '0';
    });
    this.getRandomAnime();
  }


  public getRandomAnime(): void {
    this.animeService.getAnimeCharacters(this.id ?? '0')
    .subscribe((data: CharactersResponse) =>{
      const response = data
      const results: CharacterData[] = data.data;
      this.charactersResponse= response;
      this.characterData= results;
      console.log("Character response", response)
    })
  }

  public toggleCharacters() : void {
    this.showCharacters = !this.showCharacters;
  }
}
