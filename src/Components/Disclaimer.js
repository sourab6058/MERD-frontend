import React, { useEffect } from 'react'
import Footer from "./Footer";
import NavTwo from "./NavTwo";
const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <>
      <NavTwo />
      <div className="m-16">
        <h1 className="text-3xl mb-5">Disclaimer</h1>
        <p className='text-base font-normal'>
          The terms “we”, “our”, “us” means Middle East Retail Data (MERD) FZ LLC or herein as “Middle East Retail Data (MERD)” and its subsidiaries, employees, officers, agents, affiliates or assigned parties.<br />

          The information contained on https://merd.online/ website (the “Service”) is for general information purposes only.<br />

          The information on web pages have been prepared and processed with reasonable care and is believed by us to be honest, reliable, no warrant, expressed or implied is made regarding accuracy, adequacy, completeness, legality, reliability or usefulness of any information.

          Middle East Retail Data (MERD) FZ LLC assumes no responsibility for errors or omissions in the contents on the Service and information available to users.

          In no event shall Middle East Retail Data (MERD) be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. Middle East Retail Data (MERD) reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.

          You agree that the material downloaded or otherwise accessed through the use of our web pages is obtained entirely at your own risk and that you will be entirely responsible for any resulting damage to software or computer systems and/or any resulting loss of data even if we have been advised of the possibility of any such damage.

          External links disclaimer
          https://merd.online/ website may contain links to external websites that are not provided or maintained by or in any way affiliated with Middle East Retail Data (MERD)<br />

          Please note that the Middle East Retail Data (MERD) does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.<br />
        </p>


      </div>
      <Footer />
    </>
  )
}

export default Disclaimer