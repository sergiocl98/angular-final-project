import { ActivatedRoute } from '@angular/router';
import { AnimeService } from './../../../core/services/anime.service';
import { EpisodeData, EpisodeResponse } from './../../../core/services/models/anime-episodes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  public id?: string;
  episodeData?: EpisodeData[];
  episodesResponse?: EpisodeResponse;
  public showEpisodes: boolean = false;
  constructor(private route: ActivatedRoute,private animeService: AnimeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '0';
    });
    this.getEpisodes();
  }

  public getEpisodes(): void {
    this.animeService.getAnimeEpisodes(this.id ?? '0')
    .subscribe((data: EpisodeResponse) =>{
      const response = data
      const results: EpisodeData[] = data.data;
      this.episodesResponse= response;
      this.episodeData= results;
      console.log("Episodes response", response)
    })
  }

  public toggleEpisodes() : void {
    this.showEpisodes = !this.showEpisodes;
  }
}
