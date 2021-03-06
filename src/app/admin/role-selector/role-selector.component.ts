import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {UsersService} from '../admin-services/users.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css']
})
export class RoleSelectorComponent implements OnInit {
  filteredRoles: Observable<string[]>;
  allRoles: string[] = [];
  @Input() userRoles: string[];
  @ViewChild('roleSelect') roleSelect: MatSelect;
  @Input() userData;
  @Input() onUserDataUpdated: Subject<any>;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.GetALlRoles().pipe(map(p => p.filter(o => o.name !== 'Default'))).subscribe(rolesResult => {
      rolesResult.forEach(role => this.allRoles.push(role.name));

      // Subscribe to the Subject provided as an Input to listen.
      // When the userData is updated the Subject sends empty data by the next() method
      // which triggers filling-up filteredRoles.
      if (this.onUserDataUpdated) {
        this.onUserDataUpdated.subscribe(() => {
          this.filteredRoles = of(this.allRoles.filter(p => !this.userData.get('role').value.includes(p)).slice());
          this.userRoles = this.userData.get('role').value.filter(p => p !== 'Default');
        });
      } else {
        this.filteredRoles = of(this.allRoles.filter(p => !this.userData.get('role').value.includes(p)).slice());
      }
    });
  }

  selected(event: MatSelectChange): void {
    const rolesTmp = this.userData.get('role').value.slice();
    rolesTmp.push(event.value);
    this.userData.patchValue({
      role: rolesTmp
    });

    this.userRoles = this.userData.get('role').value.filter(p => p !== 'Default');

    this.roleSelect.value = '';

    const userCurrentRoles: string[] = this.userData.get('role').value;
    this.filteredRoles = of(this.allRoles.filter(p => !userCurrentRoles.includes(p)).slice());
  }

  removeRole(role: string): void {
    const rolesTmp = this.userData.get('role').value.slice();
    const index = rolesTmp.indexOf(role);

    if (index >= 0) {
      rolesTmp.splice(index, 1);
    }

    this.userData.patchValue({
      role: rolesTmp
    });

    this.userRoles = this.userData.get('role').value.filter(p => p !== 'Default');

    this.filteredRoles = of(this.allRoles.filter(p => !this.userData.get('role').value.includes(p)).slice());

    const userCurrentRoles: string[] = this.userData.get('role').value;
    /*if (userCurrentRoles.length === 0) {
      this.fControl.setErrors({required: true});
    }*/
  }
}
