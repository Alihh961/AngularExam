import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IMock} from "./Interface";
import {MockService} from "./mock.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'Al Haj Hassan Ali';
  form !: FormGroup;
  available: number = 1000;
  transactions: IMock[] | null = null;
  a: string[] = ["a", "b", "c"];

  constructor(private mockService: MockService) {
  }

  ngOnInit() {
    this.formInit();
    this.setMock();
  }

  setMock() {
    this.mockService.mock$.subscribe(
      r => {
        this.transactions = r;
      }
    )
  }

  formInit() {
    this.form = new FormGroup({
      date: new FormControl(this.calculateDate(), [
        Validators.required]),
      label: new FormControl("", [
        Validators.required
      ]),
      amount: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]),
      category: new FormControl("", [
        Validators.required
      ])
    })
  }

  calculateDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const formatedDate = `${day}-${month}-${year}`;
    return formatedDate;
  }

  operation() {
    if (this.form.valid) {
      switch (this.form.get("category")?.value) {
        case "debit":
          if (this.available >= this.form.get("amount")?.value && (this.available - this.form.get("amount")?.value) >= 0) {
            this.available -= this.form.get("amount")?.value;

            this.mockService.setMock(this.form.value);

          } else {
            window.alert("No Enough credits");
          }
          break;

        case "credit":
          this.available += this.form.get("amount")?.value;


          this.mockService.setMock(this.form.value);

          break;
      }
    } else {
      window.alert("Invalid inputs , all fields are required and only numbers are allowed for the amount");
    }
  }

}
