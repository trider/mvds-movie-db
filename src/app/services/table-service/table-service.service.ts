import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbProgressbarModule, NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class TablesService {




  tableCols: any;
  paginatedTableData: any
  term: any;
  pageNum = 1;
  pageSize = 50;
  numVals: number[] = [50, 100, 150, 200]
  startIndex = 1;
  endIndex = 50;
  totalSize = 0;
  dateRange: string = 'dateRange=2014-11-12Z..' + new Date().toJSON().toString().slice(0, 10) + 'Z'
  toDate: NgbDate | null = null;
  showTable: boolean = false;




  filterForm = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl()
  })


  constructor(
    // private snackBar: MatSnackBar,
    // private exportAsService: ExportAsService,
    private calendar: NgbCalendar
  ) { }



  getValType(item: any, val: any) {
    if (typeof (val[item.field]) === 'string') {
      return val[item.field].toString().toLowerCase()
    }
    else {
      return val[item.field]
    }


  }

  public sortBy(page: any, tableData: any, tableCols: any, i: number) {


    let cols = []

    for (let item of tableCols) {
      item.isSelected = false
      if (item.key === i && item.sortHeader) {

        if (item.isAsc) {
          tableData = tableData.sort((a:any, b:any) => (this.getValType(item, a) > this.getValType(item, b)) ? 1 : -1)
        }
        else {
          tableData = tableData.sort((a:any, b:any) => (this.getValType(item, a) < this.getValType(item, b)) ? 1 : -1)
        }
        item.isAsc = !item.isAsc
        item.isSelected = true
      }
      cols.push(item)
    }

    return tableData
  }

 




  formatDate(date:any) {
    const d: Date = new Date(date), year = d.getFullYear();
    return [year];
  }

  public setShowNum(val: number) {

    return {
      numVal: val,
      pageSize: val,
      endIndex: val
    }
  }

  public onPageChange(page: any, pageSize:number, tableData: any): void {
    const startIndex = (page - 1) * pageSize;
    const endIndex = (page - 1) * pageSize + pageSize;
    return tableData.slice(startIndex, endIndex);
  }





}
