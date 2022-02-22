import jsPDF from 'jspdf'
import 'jspdf-autotable'

const pdfDownloader = (csvData) =>{
  
  console.log(csvData,"PDfData")
  const doc = new jsPDF()
  doc.text("MarketData",20,10)

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, // European countries centered
    body: [
      { europe: 'Sweden', america: 'Canada', asia: 'China' },
      { europe: 'Norway', america: 'Mexico', asia: 'Japan' },
    ],
    columns: [
      { header: 'January', dataKey: 'europe' },
      { header: 'February', dataKey: 'asia' },
      { header: 'March', dataKey: 'asia' },
      { header: 'April', dataKey: 'asia' },
      { header: 'May', dataKey: 'asia' },
      { header: 'June', dataKey: 'asia' },
      { header: 'July', dataKey: 'asia' },
      { header: 'August', dataKey: 'asia' },
      { header: 'August', dataKey: 'asia' },
      { header: 'August', dataKey: 'asia' },
      { header: 'August', dataKey: 'asia' },
      { header: 'August', dataKey: 'asia' },
    ],
  })
  doc.save('table.pdf')
}



export default pdfDownloader;