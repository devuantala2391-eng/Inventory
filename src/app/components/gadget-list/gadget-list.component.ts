import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { GadgetService } from '../../services/gadget.service';
import { Gadget } from '../../models/gadget.model';

@Component({
  selector: 'app-gadget-list',
  standalone: false,
  template: `
    <div class="gadget-list-container">
      <mat-toolbar>
        <span>Gadgets Inventory</span>
        <span class="spacer"></span>
        <button mat-raised-button color="primary" (click)="openCreateDialog()">
          Add New Gadget
        </button>
      </mat-toolbar>

      <div class="table-container">
        <table mat-table [dataSource]="dataSource">
          <!-- Checkbox Column -->
          <ng-container matColumnDef="select">
            <th mat-header-cell *matHeaderCellDef>
              <mat-checkbox (change)="$event ? masterToggle() : null"
                          [checked]="selection.hasValue() && isAllSelected()"
                          [indeterminate]="selection.hasValue() && !isAllSelected()">
              </mat-checkbox>
            </th>
            <td mat-cell *matCellDef="let row">
              <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(row) : null"
                          [checked]="selection.isSelected(row)">
              </mat-checkbox>
            </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Name </th>
            <td mat-cell *matCellDef="let gadget"> {{gadget.name}} </td>
          </ng-container>

          <!-- Price Column -->
          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef> Price </th>
            <td mat-cell *matCellDef="let gadget"> {{gadget.price | currency}} </td>
          </ng-container>

          <!-- Quantity Column -->
          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef> Quantity </th>
            <td mat-cell *matCellDef="let gadget"> {{gadget.quantity}} </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let gadget">
              <button mat-icon-button (click)="viewGadget(gadget)">
                <mat-icon>visibility</mat-icon>
              </button>
              <button mat-icon-button (click)="editGadget(gadget)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteGadget(gadget)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"
              (click)="viewGadget(row)"></tr>
        </table>

        <mat-paginator [length]="totalItems"
                      [pageSize]="10"
                      [pageSizeOptions]="[5, 10, 25, 100]"
                      (page)="onPageChange($event)">
        </mat-paginator>
      </div>

      <div class="bulk-actions" *ngIf="selection.hasValue()">
        <button mat-raised-button color="primary" (click)="bulkUpdate()">
          Update Selected
        </button>
        <button mat-raised-button color="warn" (click)="bulkDelete()">
          Delete Selected
        </button>
      </div>
    </div>
  `,
  styles: [`
    .gadget-list-container {
      padding: 20px;
    }

    .table-container {
      margin-top: 20px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .bulk-actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }

    table {
      width: 100%;
    }
  `]
})
export class GadgetListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Gadget>([]);
  selection = new SelectionModel<Gadget>(true, []);
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private gadgetService: GadgetService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGadgets();
  }

  loadGadgets(page: number = 1): void {
    this.gadgetService.getGadgets(page).subscribe(response => {
      this.dataSource.data = response.items;
      this.totalItems = response.total;
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onPageChange(event: any): void {
    this.loadGadgets(event.pageIndex + 1);
  }

  openCreateDialog(): void {
    // Implement create dialog
  }

  viewGadget(gadget: Gadget): void {
    // Implement view dialog
  }

  editGadget(gadget: Gadget): void {
    // Implement edit dialog
  }

  deleteGadget(gadget: Gadget): void {
    // Implement delete confirmation
  }

  bulkUpdate(): void {
    // Implement bulk update dialog
  }

  bulkDelete(): void {
    // Implement bulk delete confirmation
  }
}