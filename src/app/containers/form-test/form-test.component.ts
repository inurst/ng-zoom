import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.css']
})
export class FormTestComponent implements OnInit {

  title = ['นาย', 'นางสาว', 'เด็กชาย', 'เด็กหญิง', 'พระ', 'สามเณร'];

  constructor() { }

  ngOnInit(): void {
  }

  goSubmit() {
    console.log('Submit');
  }

}
