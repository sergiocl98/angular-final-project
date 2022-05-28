import { AnimeService } from './../../core/services/anime.service';
import { IAnime, IAnimeData } from './../../core/services/models/anime-model';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public id?: string;
  animeResponse?: IAnime;
  animeDetail?: IAnimeData;
  url?: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private animeService: AnimeService, private sanitazier: DomSanitizer ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '0';
    });
    this.getAnimeDetail()
  }

  public getAnimeDetail(): void {
    //showLoading
    this.animeService.getAnimeById(this.id ?? '0')
    .subscribe((data: IAnime) =>{
      //hideLoading
      const response = data
      const result: IAnimeData = data.data;
      this.animeResponse= response
      this.animeDetail = result;
      console.log("RESPONSE by id", this.animeResponse)
      this.url = this.sanitazier.bypassSecurityTrustResourceUrl(this.animeDetail?.trailer.embed_url+"&mute=1&loop=1&playlist="+this.animeDetail?.trailer.youtube_id)
    })
  }
}
