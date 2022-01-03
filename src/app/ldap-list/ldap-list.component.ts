import { Component, OnInit, ViewChild} from '@angular/core';
import {UserLdap} from "../model/user-ldap";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UsersService} from "../service/users.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})
export class LdapListComponent implements OnInit {

    displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
    dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();

  }
  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }
  // @ts-ignore
  applyFilter($event: keyboardEvent): boolean {
    const  filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  addUser(){
    this.router.navigate(['/user/add']).then( (e) => {
      if (! e) {
        console.log('Navigation has failed');
      }
    });
  }
  unactiveSelected = false;

  private getUsers(): void {
    this.usersService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter( user => user.active === false
          );
        } else {
          this.dataSource.data = users
        }
      });
  }
  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }
  ngAfterViewInit(): void {
    console.log('Values on ngAfterViewInit():');
    console.log("Mat Paginator:", this.paginator);
  }
  edit(login: string) {
    this.router.navigate(['/user', login]).then( (e) => {
      if (! e) {
        console.log("Navigation has failed!");
      }
    });
  }

}

