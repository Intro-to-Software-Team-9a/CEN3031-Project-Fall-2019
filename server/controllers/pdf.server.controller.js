var markdownpdf = require("markdown-pdf")

/**
 * @param id {Integer}
 */
function genPDF(req, res) {
    try{
        markdownpdf()
            //.from("C:\Users\hhope\Documents/IntroSoft/projectFall2019/CEN3031-Project-Fall-2019/sample.md")
            .from("sample.md")
            //.to("C:\Users\hhope\Documents/IntroSoft/projectFall2019/CEN3031-Project-Fall-2019/sample.pdf")
            .to("sample.pdf")
            return res.send()
    } catch (e) {
        res.status(500);
        return res.send({ message: errors.other.UNKNOWN });
      }
}

module.exports = {
    genPDF,
};