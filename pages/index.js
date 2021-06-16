import { useState } from 'react'
import * as XLSX from 'xlsx'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Login } from '../components/Login'

export default function Home() {
  const [items, setItems] = useState([])

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader() // Nueva instancia de lectura de archivo
      fileReader.readAsArrayBuffer(file) // Iniciar lectura de archivo

      // Ejecutar cuando se cargue un archivo
      fileReader.onload = (e) => {
        const bufferArray = e.target.result

        const wb = XLSX.read(bufferArray, { type: 'buffer' })

        const wsname = wb.SheetNames[0]

        const ws = wb.Sheets[wsname]

        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
        console.log(`wsname: ${wsname}`)
        console.log(`Names: ${wb.Workbook.Names}`)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    // Cambiar estado
    promise.then((d) => {
      setItems(d)
    })
  }

  console.log(items)
  return (
    <div className="md:tw-container tw-mx-auto tw-py-5">
      <h1 className="tw-text-2xl tw-text-center tw-mb-10">
        Carga de archivos a Acumatica ERP
      </h1>
      <div className="tw-grid tw-grid-cols-4 tw-gap-4">
        <label className="tw-col-span-1">
          <Login />
          <span className="tw-bg-green-500 tw-inline-block tw-rounded-lg tw-p-2">
            Cargar
          </span>
          <input
            id="upload"
            type="file"
            className="tw-hidden"
            onChange={(e) => {
              const file = e.target.files[0]
              readExcel(file)
            }}
          />
        </label>
        <div className="tw-col-span-3">
          {items.length > 0 ? (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>OrderType</TableCell>
                    <TableCell align="right">CustomerID</TableCell>
                    <TableCell align="right">Ubicación</TableCell>
                    <TableCell align="right">Referencia</TableCell>
                    <TableCell align="right">InventoryID</TableCell>
                    <TableCell align="right">Warehouse</TableCell>
                    <TableCell align="right">UOM</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Discount Percent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.OrderType}
                      </TableCell>
                      <TableCell align="right">{row.CustomerID}</TableCell>
                      <TableCell align="right">{row.Ubicación}</TableCell>
                      <TableCell align="right">{row.Referencia}</TableCell>
                      <TableCell align="right">{row.InventoryID}</TableCell>
                      <TableCell align="right">{row.Warehouse}</TableCell>
                      <TableCell align="right">{row.UOM}</TableCell>
                      <TableCell align="right">{row.Qty}</TableCell>
                      <TableCell align="right">{row['Unit Price']}</TableCell>
                      <TableCell align="right">
                        {row['Discount Percent']}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </div>
      </div>
    </div>
  )
}
