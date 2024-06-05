import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppartementService} from "../../services/appartementService/appartement.service";

@Component({
  selector: 'app-detail-appartement',
  templateUrl: './detail-appartement.component.html',
  styleUrls: ['./detail-appartement.component.css']
})
export class DetailAppartementComponent implements OnInit{
  appartement: any;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private appartementService: AppartementService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAppartementDetails(+id);
    }
  }

  async loadAppartementDetails(id: number): Promise<void> {
    try {
      const reponse = await this.appartementService.getAppartementById(id);
      this.appartement= reponse.data.appartements

    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
