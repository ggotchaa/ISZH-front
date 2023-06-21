import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  cardStyle = {
    width: "100%",
    textAlign: "left",
    color: "#77C48D",
    height: "100%",
  };
  ngOnInit(): void {
  }
}
