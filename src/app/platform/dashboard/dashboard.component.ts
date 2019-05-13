import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';


export interface PeriodicElement {
  name: string;
  pic: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, pic: '../../assets/award.svg', name: 'John', weight: 2817},
  {position: 2, pic: '../../assets/award.svg', name: 'Sam', weight: 3819},
  {position: 3, pic: '../../assets/award.svg', name: 'Billy', weight: 6937},
  {position: 4, pic: '../../assets/award.svg', name: 'Tony', weight: 8371},
  {position: 5, pic: '../../assets/award.svg', name: 'EJ', weight: 8792},
  {position: 6, pic: '../../assets/award.svg', name: 'Sarah', weight: 9472},
  {position: 7, pic: '../../assets/award.svg', name: 'Mark', weight: 10238},
  {position: 8, pic: '../../assets/award.svg', name: 'Emma', weight: 10782}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  user = new User();

  myData = [
    ['London', {v: 8136000, f: '8,1360'}],
    ['New York', {v: 8538000, f: '8,530'}]
  ];

  myColumnNames = ['City', 'Inhabitants'];

  myOptions = {
    legend: {position: 'none'},
    width: 950,
    height: 325
  };

  displayedColumns: string[] = ['position', 'name', 'rank'];
  dataSource = ELEMENT_DATA;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      console.log(user);
    });
  }

}
