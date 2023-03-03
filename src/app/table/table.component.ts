import { Component, Input } from '@angular/core';
import { RequestService } from '../service/request.service';
import { faFile, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
interface Header {
  key: string;
  label: string;
  id: Number
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  faFileArrowDown = faFileArrowDown;
  faFile = faFile;
  faRotateRight = faRotateRight;
  @Input()
  // data: object[] = [];
  tableData: any[] = [];
  headers: Header[] = [
      { key: 'id', label: 'ID', id: 1},
      { key: 'cnpj', label: 'CNPJ' , id: 2},
      { key: 'nome_FANTASIA', label: 'Nome Fantasia', id: 3},
      { key: 'qtde_LOJA', label: 'Quantidade de Lojas', id: 4},
      { key: 'dias_UTEIS_VECTO_BOLETO', label: 'Dias Úteis', id: 5},
      // { key: 'correios_1', label: 'Correios 1', id: 6},
      // { key: 'correios_2', label: 'Correios 2', id: 7},
      // { key: 'correios_3', label: 'Correios 3', id: 8},
      // { key: 'correios_4', label: 'Correios 4', id: 9},
      { key: 'total_CREDITO_ADQUIRIDO', label: 'Crédito Adquirido', id: 10},
      // { key: 'qtde_TERMOS_EMITIDOS', label: 'Quantidade de Termos Emitidos', id: 11},
      // { key: 'valor_UNITARIO_TERMO_ADESAO', label: 'Valor Unitário do Termo de Adesão', id: 12},
      // { key: 'qtde_CARTAO_EMITIDOS', label: 'Quantidade de Cartões Emitidos', id: 13},
      // { key: 'valor_MENSALIDADE', label: 'Valor da Mensalidade', id: 14},
      // { key: 'taxa_REGIME_ESPECIAL', label: 'Taxa do Regime Especial', id: 15},
      { key: 'qtde_TERMOS_CANCELADOS', label: 'Termos Cancelados', id: 16},
      // { key: 'valor_UNITARIO_EMISSAO_CARTAO', label: 'Valor Unitário da Emissão do Cartão', id: 17},
      // { key: 'email_COBRANCA_2', label: 'Email de Cobrança 2', id: 18},
      { key: 'tipo_MENSALIDADE', label: 'Tipo de Mensalidade', id: 19},
      { key: 'email_COBRANCA_1', label: 'Email de Cobrança 1', id: 20},
      { key: 'status', label: 'Status', id: 21},
      // { key: 'mes_REFERENCIA', label: 'Mês de Referência', id: 22},
      // { key: 'ano_REFERENCIA', label: 'Ano de Referência', id: 23},
      { key: 'dataCriacao', label: 'Data de Criação', id: 24},
      // { key: 'gerarFatura', label: 'Gerar Fatura', id: 25},
    ];


    sortColumn: string = '';
    sortDirection: string = '';

    constructor(private requestService: RequestService) { }

    ngOnInit() {
        this.requestService.getRegistries().subscribe(
          event => {
            this.tableData = event.body;
          },
          error => {
            console.log(error);
          }
        );
    }

    async gerarTodasFaturas() {
      try {
        const response = await this.requestService.generateAll().toPromise();
        console.log(response.body)
        this.tableData = response.body;
      } catch (error) {
        console.log(error);
      }
    }


    async gerarFatura(id: Number) {
      try {
        const response = await this.requestService.generate(id).toPromise();
        console.log(this.tableData)
        console.log(response)
        this.tableData
      } catch (error) {
        console.log(error);
      }
    }
    async atualizaFatura(id: Number) {
      try {
        const response = await this.requestService.updateInvoice(id).toPromise();
        this.tableData.keys = response.body;
      } catch (error) {
        console.log(error);
      }
    }

    baixarFatura(id: Number) {
      this.requestService.downloadInvoice(id)
    }

    sortTable(column: string) {
      if (this.sortColumn === column) {
        // if the same column is clicked again, reverse the sort direction
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // if a new column is clicked, set the sort column to the new column and set the sort direction to ascending
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }

      // sort the data array based on the sort column and sort direction
      this.tableData.sort((a, b) => {
        let val1 = a[this.sortColumn];
        let val2 = b[this.sortDirection];
        if (this.sortDirection === 'asc') {
          return val1 < val2 ? -1 : val1 > val2 ? 1 : 0;
        } else {
          return val1 < val2 ? 1 : val1 > val2 ? -1 : 0;
        }
      });
    }
    }
