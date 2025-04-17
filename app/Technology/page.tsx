import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PatentDisclosureSection() {
  return (
    <div className="p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-4">Patent-Pending Technologies</h1>
      <p className="text-base mb-6">
        The following technologies have been filed as provisional patents with the USPTO by QbitShield LLC. They represent a fundamental advancement in
        quantum cryptographic systems, signal encoding, and computational frameworks. All concepts are patent-pending and protected under U.S. law.
      </p>

      <Accordion type="multiple">
        <AccordionItem value="pb-qkd">
          <AccordionTrigger>1. Prime-Based Quantum Key Distribution (PB-QKD)</AccordionTrigger>
          <AccordionContent>
            Enhances QKD security with prime-sequenced wavefunctions. Outperforms BB84 and Twin-Field QKD in error rates, noise resistance, and eavesdropping detection.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pb-qft">
          <AccordionTrigger>2. Prime-Based Quantum Fourier Transform (PB-QFT)</AccordionTrigger>
          <AccordionContent>
            A generalization of QFT using prime modulations to improve accuracy and cryptographic resilience in quantum systems.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="phm">
          <AccordionTrigger>3. Prime Harmonic Modulation (PHM)</AccordionTrigger>
          <AccordionContent>
            A unified framework that encodes energy states and entropy flows using prime-number wave patterns — connecting atomic structures to cosmic harmonics.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pof">
          <AccordionTrigger>4. Prime Operating Framework (POF)</AccordionTrigger>
          <AccordionContent>
            A scalable post-quantum operating environment combining SDK, hardware schematics, and AI-integrated logic gates based on prime encoding.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mt-8">
        <CardContent className="text-sm p-4">
          <p><strong>Filed by:</strong> QbitShield LLC</p>
          <p><strong>Inventor:</strong> Will Daoud</p>
          <p><strong>Date Filed:</strong> March 13, 2025</p>
          <p><strong>Status:</strong> Provisional patent filings under review</p>
          <p><strong>Contact:</strong> legal@qbitshield.com</p>
        </CardContent>
      </Card>
    </div>
  )
}
