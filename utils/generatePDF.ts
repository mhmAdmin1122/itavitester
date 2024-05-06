import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (data: any[]) => {
  const content: any[] = [
    [{ text: 'Newsletter Subscribers', style: 'header' }],
    [' '], // Empty line for spacing
  ];

  data.forEach(item => {
    content.push(
      [`Email: ${item.email}`, `Date: ${item.date}`],
      ['--------------------------------------']
    );
  });

  const docDefinition = {
    content,
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: 'center' as const
      }
    }
  };

  return pdfMake.createPdf(docDefinition);
};

export default generatePDF;
