import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material';

@Component({
  selector: 'chip-list-validation-example',
  templateUrl: 'chip-list-validation-example.html',
  styleUrls: ['chip-list-validation-example.css'],
})
export class ChipListValidationExample implements OnInit {
  @ViewChild('chipList') chipList: MatChipList;
  public myForm: FormGroup;
  selectedWorkFlow: string = 'Blank workflow'
   pokemonControl = new FormControl();
   workFlowList = [
     {key: 'Toantest', value: 'Toan test'},
     {key: 'Toantest', value: 'Sum test'},
     {key: 'Toantest', value: 'Hieu test'},
   ]
  toppings = new FormControl();
  toppingList: string[] = ['+601117225095', '+6566816574', '+6566816594', '+6568714279', '	+6566816492'];
  // name chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  status: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // data
  data = {
    names: ['name1', 'name2']
  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      names: this.fb.array(this.data.names, this.validateArrayNotEmpty)
    });
  }

  ngOnInit() {
    this.myForm.get('names').statusChanges.subscribe(status =>
      this.chipList.errorState = status === 'INVALID' ? true : false);
  }

  initName(name: string): FormControl {
    return this.fb.control(name);
  }

  validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  add(event: MatChipInputEvent, form: FormGroup): void {
    const input = event.input;
    const value = event.value;

    // Add name
    if ((value || '').trim()) {
      const control = <FormArray>form.get('names');
      control.push(this.initName(value.trim()));
      console.log(control);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(form, index) {
    console.log(form);
    form.get('names').removeAt(index);
  }
  toggleStatus(){
    this.status = !this.status
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */