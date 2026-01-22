'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { initSwiper, initAOS, initSplitting, initSmoothScroll } from './animations'

export default function BloodSampleCollection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [expandedPackage, setExpandedPackage] = useState<string | null>('')
  const [activeTab, setActiveTab] = useState<'general' | 'specialized' | 'gender'>('general')

  useEffect(() => {
    // Initialize all animations
    initAOS()
    initSplitting()
    initSwiper()
    initSmoothScroll()
  }, [])

  const cities = [
    'Johor Bahru',
    'Kuala Lumpur',
    'Klang Valley',
    'Penang',
    'Melaka',
    'Negeri Sembilan',
    'Perak',
    'Subang Jaya',
    'Shah Alam',
    'Petaling Jaya',
    'Kajang',
    'Seberang Perai',
    'Seremban',
    'Malacca City',
    'Kota Kinabalu',
    'Kedah',
    'Pahang',
    'Sabah',
    'Sarawak',
    'Other Places in Malaysia',
  ]

  const benefitsList = [
    { title: 'Seniors and Elderly Patients', description: '' },
    { title: 'Homebound or Immunocompromised Individuals', description: '' },
    { title: 'Busy Working Professionals', description: '' },
    { title: 'Parents with Young Children', description: '' },
    { title: 'Chronic Disease Patients', description: '' },
    { title: 'Pregnant Women', description: '' },
    { title: 'Caregivers and Families', description: '' },
    { title: 'Clinics and Telehealth Providers', description: '' },
    { title: 'Corporate Wellness Programs', description: '' },
  ]

  const testPackages = {
    general: [
      {
        id: 'basic',
        title: 'Basic Health Screening – 33 Tests Included',
        icon: '/assets/images/svg/blood-screen.svg',
        description: 'Ideal for general health tracking.',
        sections: [
          {
            name: 'Full Blood count',
            tests: [
              'Haemoglobin',
              'Red Blood Cells (RBC)',
              'Red Cell Distribution Width (RDW)',
              'White Blood Cells (WBC) Total',
              '5 Parts Differential Count',
              'Platelet Count',
              'Haematocrit (HCT)',
              'MCH/MCV',
              'MCHC',
              'ABO & Rh',
              'Erythrocyte Sedimentation Rate (ESR)',
            ],
          },
          {
            name: 'Renal Function Test 2',
            tests: [
              'Urea',
              'Creatinine',
              'Calcium',
              'Corrected Calcium',
              'Phosphate',
              'Uric Acid',
              'Glomerulus Filtration',
            ],
          },
          {
            name: 'Liver Function Test',
            tests: [
              'Total Bilirubin',
              'Total Protein',
              'Albumin',
              'Globulin',
              'Alkaline Phosphatase (ALP)',
              'Aspartate Aminotransferase (AST)',
              'Alanine Transaminase (ALT)',
              'Gamma-glutamyl transferase (GGT)',
            ],
          },
          {
            name: 'Diabetic screen',
            tests: ['Blood Glucose'],
          },
          {
            name: 'Urine Examination',
            tests: ['Urine FEME 10 Parameters'],
          },
          {
            name: 'Lipid Profile',
            tests: [
              'Total Cholesterol',
              'HDL Cholesterol',
              'LDL Cholesterol',
              'Triglycerides',
              'Total Chol / HDL Chol Ratio',
            ],
          },
        ],
      },
      {
        id: 'diabetes',
        title: 'Diabetes Screening – 34 Tests Included',
        icon: '/assets/images/svg/diabetes.svg',
        description: 'Ideal for general health tracking.',
        sections: [
          {
            name: 'Full Blood count',
            tests: [
              'Haemoglobin',
              'Red Blood Cells (RBC)',
              'Red Cell Distribution Width (RDW)',
              'White Blood Cells (WBC) Total',
              '5 Parts Differential Count',
              'Platelet Count',
              'Haematocrit (HCT)',
              'MCH/MCV',
              'MCHC',
              'ABO & Rh',
              'Erythrocyte Sedimentation Rate (ESR)',
            ],
          },
          {
            name: 'Renal Function Test 2',
            tests: [
              'Urea',
              'Creatinine',
              'Calcium',
              'Corrected calcium',
              'Phosphate',
              'Uric acid',
              'Glomerulus Filtration Rate (GFR)',
            ],
          },
          {
            name: 'Liver Function Test',
            tests: [
              'Total Bilirubin',
              'Total Protein',
              'Albumin',
              'Globulin',
              'Alkaline Phosphatase (ALP)',
              'Aspartate Aminotransferase (AST)',
              'Alanine Transaminase (ALT)',
              'Gamma-glutamyl transferase (GGT)',
            ],
          },
          {
            name: 'Diabetic screen',
            tests: ['Blood Glucose', 'HbA1c'],
          },
          {
            name: 'Urine Examination',
            tests: ['Urine FEME 10 Parameters'],
          },
          {
            name: 'Lipid Profile',
            tests: [
              'Total Cholesterol',
              'HDL Cholesterol',
              'LDL Cholesterol',
              'Triglycerides',
              'Total Chol / HDL Chol Ratio',
            ],
          },
        ],
      },
      {
        id: 'cardiac',
        title: 'Cardiac Risk Screening – 38 Tests Included',
        icon: '/assets/images/svg/heart.svg',
        description: 'Assessing heart health and cardiovascular risk.',
        sections: [
          {
            name: 'Full Blood count',
            tests: [
              'Haemoglobin',
              'Red Blood Cells (RBC)',
              'Red Cell Distribution Width (RDW)',
              'White Blood Cells (WBC) Total',
              '5 Parts Differential Count',
              'Platelet Count',
              'Haematocrit (HCT)',
              'MCH/MCV',
              'MCHC',
              'ABO & Rh',
              'Erythrocyte Sedimentation Rate (ESR)',
            ],
          },
          {
            name: 'Renal Function Test 2',
            tests: [
              'Urea',
              'Creatinine',
              'Calcium',
              'Corrected calcium',
              'Phosphate',
              'Uric acid',
              'Glomerulus Filtration Rate (GFR)',
            ],
          },
          {
            name: 'Liver Function Test',
            tests: [
              'Total Bilirubin',
              'Total Protein',
              'Albumin',
              'Globulin',
              'Alkaline Phosphatase (ALP)',
              'Aspartate Aminotransferase (AST)',
              'Alanine Transaminase (ALT)',
              'Gamma-glutamyl transferase (GGT)',
            ],
          },
          {
            name: 'Diabetic screen',
            tests: ['Blood Glucose'],
          },
          {
            name: 'Urine Examination',
            tests: ['Urine FEME 10 Parameters'],
          },
          {
            name: 'Lipid Profile',
            tests: [
              'Total Cholesterol',
              'HDL Cholesterol',
              'LDL Cholesterol',
              'Triglycerides',
              'Total Chol / HDL Chol Ratio',
            ],
          },
          {
            name: 'Others',
            tests: [
              'Lactate Dehydrogenase (LDH)',
              'Creatinine Kinase (CK)',
              'HOMOCYSTEINE',
              'C-Reactive Protein (CRP)',
            ],
          },
        ],
      },
    ],
    specialized: [
      {
        id: 'tumor-male',
        title: 'Tumor Marker Screening (Male)- 30+ tests Included',
        icon: '/assets/images/svg/cancer.svg',
        description: 'Screening for common cancer markers in men.',
        sections: [
          {
            name: 'Full Blood count',
            tests: [
              'Haemoglobin',
              'Red Blood Cells (RBC)',
              'Red Cell Distribution Width (RDW)',
              'White Blood Cells (WBC) Total',
              '5 Parts Differential Count',
              'Platelet Count',
              'Haematocrit (HCT)',
              'MCH/MCV',
              'MCHC',
              'ABO & Rh',
              'Erythrocyte Sedimentation Rate (ESR)',
            ],
          },
          {
            name: 'Tumor Markers',
            tests: [
              'PSA (Prostate-Specific Antigen)',
              'CEA (Carcinoembryonic Antigen)',
              'AFP (Alpha-Fetoprotein)',
              'CA 19-9',
            ],
          },
          {
            name: 'Supporting Tests',
            tests: ['Liver Function Test', 'Renal Function Test', 'Lipid Profile', 'Blood Glucose'],
          },
        ],
      },
      {
        id: 'arthritis',
        title: 'Arthritis Screening – 45 Tests',
        icon: '/assets/images/svg/joint.svg',
        description: 'Investigating joint pain and inflammatory conditions.',
        sections: [
          {
            name: 'Core Tests',
            tests: [
              'All Basic Tests',
              'Rheumatoid Factor (RF)',
              'C-Reactive Protein (CRP)',
              'Antinuclear Antibodies (ANA)',
              'ASOT',
              'Vitamin D',
            ],
          },
        ],
      },
      {
        id: 'kidney',
        title: 'Kidney Screening – 15+ Tests Included',
        icon: '/assets/images/svg/kidney.svg',
        description: 'Evaluating kidney function and detecting early signs of kidney disease.',
        sections: [
          {
            name: 'Core Tests',
            tests: [
              'FBC',
              'Blood Sugar',
              'Creatinine (with eGFR)',
              'Uric Acid',
              'Key Electrolytes',
              'Urine Microalbumin',
            ],
          },
        ],
      },
    ],
    gender: [
      {
        id: 'comprehensive-male',
        title: 'Comprehensive Male Screening (66 Tests included)',
        icon: '/assets/images/svg/comprehensive.svg',
        description:
          "This broad panel is designed to provide a complete evaluation of a man's health, including hormone levels and major cancer markers.",
        sections: [
          {
            name: 'Full Blood count',
            tests: [
              'Haemoglobin',
              'Red Blood Cells (RBC)',
              'Red Cell Distribution Width (RDW)',
              'White Blood Cells (WBC) Total',
              '5 Parts Differential Count',
              'Platelet Count',
              'Haematocrit (HCT)',
              'MCH/MCV',
              'MCHC',
              'ABO & Rh',
              'Erythrocyte Sedimentation Rate (ESR)',
            ],
          },
          {
            name: 'Renal Function Test',
            tests: [
              'Urea',
              'Creatinine',
              'Calcium',
              'Corrected calcium',
              'Phosphate',
              'Uric acid',
              'Glomerulus Filtration Rate (GFR)',
            ],
          },
          {
            name: 'Liver Function Test',
            tests: [
              'Total Bilirubin',
              'Total Protein',
              'Albumin',
              'Globulin',
              'Alkaline Phosphatase (ALP)',
              'Aspartate Aminotransferase (AST)',
              'Alanine Transaminase (ALT)',
              'Gamma-glutamyl transferase (GGT)',
            ],
          },
        ],
      },
      {
        id: 'comprehensive-female',
        title: 'Comprehensive Female Screening (66 Tests included)',
        icon: '/assets/images/svg/comprehensive.svg',
        description:
          "This broad panel is designed to provide a complete evaluation of a woman's health, including hormone levels and major cancer markers.",
        sections: [
          {
            name: 'Full Blood count',
            tests: [
              'Haemoglobin',
              'Red Blood Cells (RBC)',
              'Red Cell Distribution Width (RDW)',
              'White Blood Cells (WBC) Total',
              '5 Parts Differential Count',
              'Platelet Count',
              'Haematocrit (HCT)',
              'MCH/MCV',
              'MCHC',
              'ABO & Rh',
              'Erythrocyte Sedimentation Rate (ESR)',
            ],
          },
          {
            name: 'Renal Function Test',
            tests: [
              'Urea',
              'Creatinine',
              'Calcium',
              'Corrected calcium',
              'Phosphate',
              'Uric acid',
              'Glomerulus Filtration Rate (GFR)',
            ],
          },
          {
            name: 'Liver Function Test',
            tests: [
              'Total Bilirubin',
              'Total Protein',
              'Albumin',
              'Globulin',
              'Alkaline Phosphatase (ALP)',
              'Aspartate Aminotransferase (AST)',
              'Alanine Transaminase (ALT)',
              'Gamma-glutamyl transferase (GGT)',
            ],
          },
        ],
      },
      {
        id: 'senior',
        title: 'Senior Citizen Health Panel – 20+ Tests Included',
        icon: '/assets/images/svg/heart-beat.svg',
        description: 'A thorough check-up tailored for the health needs of seniors.',
        sections: [
          {
            name: 'Core Tests',
            tests: [
              'Full Blood Count (FBC)',
              'HbA1c',
              'Lipid Profile',
              'Liver Function',
              'Kidney Function',
              'Key Electrolytes',
              'Thyroid Stimulating Hormone (TSH)',
              'Relevant Tumor Marker-PSA (Prostate-Specific Antigen) Test, CA 15-3 (Cancer Antigen 15-3) Test',
            ],
          },
        ],
      },
    ],
  }

  const faqItems = [
    {
      question: 'How do you ensure the quality of the laboratory testing my sample?',
      answer:
        'We work only with an accredited lab network to ensure the highest level of reliability and precision. This guarantees that every specimen is handled with great care and quality, therefore giving you results you may rely upon.',
    },
    {
      question: 'How do I know what blood test I need?',
      answer:
        'Depending on your needs: If you are uncertain as to where to start, we can either provide advice for your current symptoms or special health purposes (such as checking nutritional deficiencies or assessing cardiovascular health), or your doctor can provide advice based on a direct order. Use our Teleconsultation Platform: Professional medical guidance can be obtained by speaking with a doctor who can assess your needs and recommend the most suitable tests for you through our teleconsultation platform. Consult Your Doctor: You can always speak with your own doctor first. Once they tell you which tests you need, you can simply use our service to arrange a convenient home sample collection.',
    },
    {
      question: 'Who will visit to draw my blood sample?',
      answer:
        'Only licensed and trained phlebotomists, certified nurses, or doctors with an annual practicing certificate from MOH Malaysia will visit. They have experience with children, seniors, and patients with chronic illnesses.',
    },
    {
      question: 'Is taking blood at home truly safe?',
      answer:
        'Yes. We have extremely rigorous infection control procedures, employ one-time-use sterile instruments, and practice hospital-grade sanitation on every visit.',
    },
    {
      question: 'Do I have to fast prior to a home blood test?',
      answer:
        "Not always. A few tests, such as lipid profiles or fasting glucose, involve 8 to 12 hours of fasting. After you schedule, we'll make sure you know precisely what you should do, so there is no confusion.",
    },
    {
      question: 'Is home blood collection sterile and safe?',
      answer:
        'Yes. All procedures follow hospital-grade hygiene standards. Our phlebotomists wear sealed, disposable kits and PPE, providing a clean and hygienic environment for each visit.',
    },
    {
      question: 'Are the phlebotomists certified in Malaysia?',
      answer:
        'Yes. All of them are licensed, trained, and experienced at clinical blood draws. Some of them are even certified to draw from children, the elderly, and people with special needs.',
    },
    {
      question: "What if I'm on medication or have a chronic condition?",
      answer:
        'For your safety, we recommend speaking with your doctor first. You can also book a teleconsultation with our doctors and then inform our team about your condition and any special instructions provided.',
    },
    {
      question: 'When and how will I get my results?',
      answer:
        'The majority of the test results are electronic reporting within 24-48 hours. We will send a secure link via email or WhatsApp.',
    },
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Book Your Slot',
      description:
        'Choose your test and schedule a home visit online or by phone. Early morning and weekend slots are available.',
      icon: '/assets/images/svg/doctor-booking.svg',
    },
    {
      number: '02',
      title: 'Receive Pre-Test Guidelines',
      description: "We'll share simple prep instructions (e.g., fasting, hydration, medications) based on your test.",
      icon: '/assets/images/svg/health-guidelines.svg',
    },
    {
      number: '03',
      title: 'Identity & Consent Check',
      description:
        'On arrival, our phlebotomist verifies your identity and collects consent digitally before proceeding.',
      icon: '/assets/images/svg/health-check.svg',
    },
    {
      number: '04',
      title: 'Sterile Sample Collection',
      description: 'Using only new, sealed needles and PPE, we collect your blood with maximum comfort and hygiene.',
      icon: '/assets/images/svg/blood-test-collection.svg',
    },
    {
      number: '05',
      title: 'Labelling & Secure Packing',
      description: 'Your sample is barcoded, packed in a cold-chain kit, and logged for traceability.',
      icon: '/assets/images/svg/blood-bottle.svg',
    },
    {
      number: '06',
      title: 'Immediate Dispatch to Lab',
      description: 'Samples are sent directly to the lab in insulated containers with live tracking.',
      icon: '/assets/images/svg/lab.svg',
    },
    {
      number: '07',
      title: 'Receive Results Digitally',
      description: 'Reports are delivered via secure email/SMS links within 24 to 48 hours. Printed copies on request.',
      icon: '/assets/images/svg/digital-health-result.svg',
    },
  ]

  return (
    <main>
      {/* Breadcrumb Section */}
      <section className="bg-[#fef1e7] pt-8 pb-16 md:pt-[3rem] md:pb-[6rem]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[20px] md:text-3xl font-bold text-black mb-2">
            Doorstep Blood Sample Collection Services in Malaysia
          </h1>

          <ul className="flex justify-center gap-0 text-sm text-black font-semibold mt-[24px]">
            <li className="flex items-center gap-1">
              <Image
                src="/assets/images/svg/home.svg"
                alt=""
                title=""
                height="16"
                width="16"
                loading="lazy"
                className="w-4 h-4"
              />
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="ml-[5px]">›</span>
            </li>
            <li>
              <Link href="/services" className="hover:underline ml-2">
                Services
              </Link>
              <span className="ml-[10px]">›</span>
            </li>
            <li className="text-gray-500 ml-2">Blood Sample Collection</li>
          </ul>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-[url('/assets/images/bg/shape-06.webp')] bg-no-repeat bg-cover bg-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div data-aos="fade-left">
            <h2
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 splt-txt text-center lg:text-left"
              data-splitting
              data-aos="fade-in"
            >
              Book At-Home <em className="text-red-600">Blood Test & Collection</em> Services In Malaysia
            </h2>

            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              MobiLab2u brings healthcare to your doorstep with at-home blood collection service, making it easier and
              more convenient to manage your health without clinic visits. Whether you&apos;re managing a chronic
              condition, booking a routine check-up, or needing specialized diagnostic tests, our at-home blood test and
              collection service brings professional healthcare straight to your doorstep anywhere in Malaysia. Each
              appointment is performed by skilled medical professionals in adherence to proper safety protocols to
              obtain accurate and sanitary specimen samples within the comfort of your home.
            </p>

            <p className="text-[14px] sm:text-base text-gray-600 mb-[1.5rem] sm:mb-10 text-justify sm:text-left">
              We simplify the whole process. With a few clicks, you can detect available test packages, select a
              suitable time slot, and schedule an appointment without phone calls or paperwork. Your blood samples reach
              recognized laboratories, and the report is safely sent via our mobile app or registered email. It is a
              patient-centered, reliable, and convenient solution.
            </p>

            <p className="text-[14px] sm:text-base mt-4 mb-0">
              Enjoy safer, faster, and more convenient diagnostics with:
            </p>

            <ul className="space-y-2 mt-5">
              <li className="flex items-start gap-2">
                <span className="mt-1 min-w-4 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Hospital-grade accuracy at home
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Nationwide service with easy booking
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Fast, secure digital reports
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </span>
                <span className="text-[14px] sm:text-base font-semibold text-[#001e2b]">
                  Patient-first care for all ages
                </span>
              </li>
            </ul>

            <p className="text-[14px] sm:text-base mt-5">
              It&apos;s time to skip the clinic and put your health first, on your schedule, in your space.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center" data-aos="fade-right">
            <Image
              src="/assets/images/services/book-at-home-blood-test-collection-services.webp"
              alt="Healthcare professional visiting a patient at home for consultation & medical services in Malaysia."
              title="At Home Blood Test & Collection Services In Malaysia"
              width={592}
              height={540}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Lab Test Packages Section */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 overflow-hidden">
        <h3
          className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center splt-txt"
          data-splitting
          data-aos="fade-in"
        >
          At-Home <em className="text-red-600">Lab Test Packages</em> for Complete Health Screening
        </h3>

        <div className="flex flex-wrap md:flex-nowrap justify-center border-0 sm:border border-gray-200 rounded-full p-2 mb-10 gap-3 w-fit mx-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`tab-btn px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all text-[14px] sm:text-base ${
              activeTab === 'general' ? 'bg-red-600 text-white' : 'text-black'
            }`}
          >
            General Health & Preventive Screening
          </button>
          <button
            onClick={() => setActiveTab('specialized')}
            className={`tab-btn px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all text-[14px] sm:text-base ${
              activeTab === 'specialized' ? 'bg-red-600 text-white' : 'text-black'
            }`}
          >
            Specialized Screening Packages
          </button>
          <button
            onClick={() => setActiveTab('gender')}
            className={`tab-btn px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all text-[14px] sm:text-base ${
              activeTab === 'gender' ? 'bg-red-600 text-white' : 'text-black'
            }`}
          >
            Comprehensive Gender-Specific Screening Packages
          </button>
        </div>

        <div className="bg-[#fef1e7] p-6 rounded-2xl shadow" data-aos="fade-up">
          {/* Tab Content */}
          <div>
            {activeTab === 'general' && (
              <>
                <h3 className="text-[17px] lg:text-3xl md:text-xl font-bold text-center mb-2">
                  General Health & Preventive Screening
                </h3>
                <p className="text-center text-gray-700 mb-5">
                  These packages are designed for routine health monitoring and early detection of common health
                  conditions.
                </p>
              </>
            )}
            {activeTab === 'specialized' && (
              <>
                <h3 className="text-[17px] lg:text-3xl md:text-xl font-bold text-center mb-2">
                  Specialized Screening Packages
                </h3>
                <p className="text-center text-gray-700 mb-5">
                  These packages focus on specific areas of health, such as cancer risk, hormonal balance, and sexual
                  health.
                </p>
              </>
            )}
            {activeTab === 'gender' && (
              <>
                <h3 className="text-[17px] lg:text-3xl md:text-xl font-bold text-center mb-2">
                  Comprehensive Gender-Specific Screening Packages
                </h3>
                <p className="text-center text-gray-700 mb-5">
                  Our comprehensive packages offer an in-depth analysis tailored to the specific health needs of men and
                  women.
                </p>
              </>
            )}

            <div className="grid md:grid-cols-1 gap-6">
              {testPackages[activeTab].map((pkg) => (
                <div key={pkg.id}>
                  <div className="mt-4">
                    <button
                      onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)}
                      className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 min-w-12 rounded-xl flex items-center justify-center bg-[rgb(220_38_38_/_8%)]">
                          <Image
                            src={pkg.icon || '/placeholder.svg'}
                            width={40}
                            height={40}
                            alt={pkg.title}
                            title={pkg.title}
                            loading="lazy"
                            className="w-10 h-10 filter brightness-0 saturate-100 invert-[18%] sepia-[92%] saturate-[7452%] hue-rotate-[353deg] brightness-[98%] contrast-[112%]"
                          />
                        </div>
                        <span className="font-semibold text-gray-800 text-left text-[14px] sm:text-base">
                          {pkg.title}
                        </span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                          expandedPackage === pkg.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedPackage === pkg.id && (
                      <div className="bg-white p-4 mt-2 rounded-2xl shadow text-sm text-gray-700">
                        <p className="text-gray-600 mb-5">{pkg.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {pkg.sections.map((section, idx) => (
                            <div key={idx}>
                              <p className="mb-3 font-semibold text-gray-800">
                                <strong>{section.name}</strong>
                              </p>
                              <ul className="space-y-3">
                                {section.tests.map((test, testIdx) => (
                                  <li key={testIdx} className="flex items-center gap-2">
                                    <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                                      <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </span>
                                    {test}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-8 px-4 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-5 text-center">
          How Our <em className="text-red-600">At-Home Blood </em>Test Works
        </h2>

        <p className="text-center mb-5">
          We&apos;ve designed our process to be clear, convenient, and medically sound:
        </p>

        <div className="relative flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 lg:gap-10">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-40 flex justify-center items-start">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                <Image
                  src="/assets/images/services/how-our-at-home-blood-test-works.svg"
                  width={400}
                  height={400}
                  alt="Step-by-step guide for professional at-home blood testing with secure results delivery in Malaysia"
                  title="Step-by-step At-home Blood Test Process In Malaysia"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                  data-aos="fade-right"
                />
              </div>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="w-full lg:w-1/2" data-aos="fade-up">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="relative z-10 card bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition p-6 overflow-hidden mb-8"
              >
                <div className="flex items-start gap-5 relative z-10">
                  <Image
                    src={step.icon || '/placeholder.svg'}
                    width={40}
                    height={40}
                    alt={step.title}
                    title={step.title}
                    loading="lazy"
                    className="shrink-0 w-12 sm:w-12"
                  />
                  <div>
                    <h4 className="text-[16px] sm:text-xl font-semibold text-gray-900">{step.title}</h4>
                    <p className="mt-2 text-gray-600 text-[14px] sm:text-base text-justify sm:text-left">
                      {step.description}
                    </p>
                  </div>
                </div>
                <span className="absolute bottom-4 right-6 text-[5rem] font-bold text-gray-100 opacity-70 pointer-events-none leading-none z-0">
                  {step.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-4 sm:py-12 overflow-hidden">
        <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-12 text-center">
          <em className="text-red-600">Safety Protocols</em> for Sample Collection and Lab Handling
        </h3>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
          {/* Card 1 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Sample Collection & Safety</h4>
            <ul className="space-y-4">
              {[
                'Venous and Finger-Prick Collection',
                'Sterile, Single-Use Equipment',
                'Certified and Licensed Phlebotomists',
                'Infection Control Protocols',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Transport & Lab Handling</h4>
            <ul className="space-y-4">
              {[
                'Cold Chain Sample Transport',
                'Barcoded Sample Tracking',
                'Timely Sample Dispatch',
                'ISO 15189-Accredited Labs',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-[#fef1e7] rounded-2xl p-6">
            <h4 className="text-base sm:text-xl font-semibold text-gray-800 mb-4">Patient Data & Consent</h4>
            <ul className="space-y-4 text-sm sm:text-base">
              {['Digital Consent and Verification', 'Data Privacy and Confidentiality', 'Regular Internal Audits'].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Who Benefits Section */}
      <section className="py-8 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[2rem] px-4">
          {/* Left Content */}
          <div className="flex-1" data-aos="fade-right">
            <h3
              className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1d1d1f] mb-6 text-center lg:text-left splt-txt"
              data-splitting
              data-aos="fade-in"
            >
              Who Benefits From At-Home <em className="text-red-600"> Blood Test Services </em>In Malaysia?
            </h3>

            <p className="text-[14px] sm:text-base text-justify mb-6">
              MobiLab2u is trusted by a wide range of individuals and institutions across Malaysia, including:
            </p>

            {/* Feature List */}
            <div className="bg-[#fef1e7] border border-gray-200 rounded-lg p-6">
              <ul className="space-y-4 text-sm sm:text-base">
                {benefitsList.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    <p className="text-[14px] sm:text-base text-gray-700">{benefit.title}</p>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-[14px] text-justify sm:text-base sm:text-left">
              Whether you&apos;re managing ongoing health needs or just seeking convenience, our service is designed
              with your lifestyle in mind.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full" data-aos="zoom-in">
            <Image
              src="/assets/images/services/home-blood-test-services-malaysia.webp"
              width={500}
              height={600}
              alt="Identify patients & individuals who benefit from professional home blood testing services in Malaysia"
              title="Who Can Benefit From At-home Blood Test Services, Malaysia"
              className="max-w-full md:max-w-[500px] object-cover shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0d1623] mb-8 sm:mb-12">
            Find Home Sample Collection Services <em className="text-red-600">Near You in Malaysia</em>
          </h3>

          <div className="flex flex-wrap justify-center lg:gap-4 gap-2" data-aos="fade-up">
            {cities.map((city) => (
              <div
                key={city}
                className="flex items-center gap-1 md:gap-3 md:px-6 md:py-2 py-1 px-2 border border-gray-300 rounded-full hover:shadow transition"
              >
                <Image
                  src="/assets/images/svg/location.svg"
                  width={24}
                  height={24}
                  alt="location"
                  title="location"
                  loading="lazy"
                  className="md:w-6 md:h-6 w-3 h-3"
                />
                <span className="md:text-sm text-[12px] font-medium text-[#0d1623]">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#fef1e7] py-8 md:py-16 px-6 md:px-10 rounded-2xl text-center max-w-7xl mx-auto overflow-hidden my-8">
        <div className="max-w-5xl mx-auto" data-aos="fade-up">
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-6">
            Book Your At-home <em className="text-red-600">Blood Test</em> Today With MobiLab2u
          </h3>

          <p className="text-sm md:text-lg text-gray-600 mb-10">
            Ready to bring certified diagnostics to your doorstep? With MobiLab2u, you get trusted care without stepping
            out. Schedule your appointment today, and take control of your health from the comfort of home.
          </p>

          <div className="flex flex-row justify-center items-center gap-2 flex-wrap sm:flex-nowrap">
            <Link
              href="/register"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow transition text-[#0d1623] font-medium bg-white text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
                />
              </svg>
              Register
            </Link>

            <Link
              href={{
                pathname: '/packages',
                query: { serviceType: 'test' },
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-black transition text-sm sm:text-base text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16 md:overflow-hidden">
        <div className="w-full text-center mb-12">
          <span className="bg-[#dc2626] text-white text-sm font-semibold px-5 py-2 rounded-full inline-block mb-4">
            FAQ
          </span>
          <h3 className="text-[18px] sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
            Frequently Asked Questions About<em className="text-red-600"> Home Blood Tests </em>In Malaysia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full" data-aos="fade-up">
          <div className="col-span-12 space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="border rounded-lg shadow-sm p-4 sm:p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <h4 className="text-[16px] sm:text-lg font-semibold">{item.question}</h4>
                  <span className="text-gray-500 text-xl">{openFaqIndex === index ? '✖' : '＋'}</span>
                </div>
                {openFaqIndex === index && (
                  <div className="mt-4 text-[14px] sm:text-[15px] text-gray-700">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#fef1e7] h-[370px] min-h-[300px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[370px] xl:min-h-[400px] py-6 pb-24 md:pb-10 flex md:items-center justify-center px-2 md:px-4 relative overflow-hidden">
        {/* Left Illustration */}
        <Image
          src="/assets/images/mobilab2u/home-healthcare-application.svg"
          alt="Access Healthcare Services Anytime With Mobile App Malaysia"
          title="Access Healthcare Services Anytime With Mobile App Malaysia"
          width={392}
          height={280}
          loading="lazy"
          className="absolute left-0 bottom-0 max-h-24 md:max-h-[38%] lg:max-h-[60%] xl:max-h-[70%] object-contain z-10"
        />

        {/* Right Illustration */}
        <Image
          src="/assets/images/mobilab2u/medicine-delivery.svg"
          alt="Fast Prescription Medicine Delivery Services In Malaysia"
          title="Fast Prescription Medicine Delivery Services In Malaysia"
          width={308}
          height={280}
          loading="lazy"
          className="absolute right-0 bottom-0 max-h-24 md:max-h-[45%] lg:max-h-[62%] xl:max-h-[70%] object-contain z-10"
        />

        {/* Decorative SVG Star 1 */}
        <div className="absolute left-[2%] top-[20%] md:left-[24%] lg:left-[27%] md:top-[40%] rotate-45 z-0">
          <svg width="48" height="54" viewBox="0 0 193 216" fill="none">
            <g clipPath="url(#clip0_26_34468)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9ZM63.9 80.5C64.8 80.8 65.6 80.9 65.8 79.3C65 79.8 64.5 80.2 63.9 80.5Z"
                fill="#100F12"
              />
            </g>
            <defs>
              <clipPath id="clip0_26_34468">
                <rect width="193" height="215" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Decorative SVG Star 2 */}
        <div className="absolute right-4 top-[7rem] sm:right-[25%] md:right-[20%] lg:right-[26%] sm:top-[13rem] rotate-45 scale-100 opacity-100 z-0 w-10 h-10 sm:w-auto sm:h-auto">
          <svg width="42" height="42" viewBox="0 0 193 216" fill="none" className="w-full h-full">
            <g clipPath="url(#clip0_26_34468)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.3 109.9C54.2 109.7 53.3 109.6 52.6 109.3C47.1 106.4 41.7 103.4 36.2 100.7C29.4667 97.4333 22.4333 95.1333 15.1 93.8C10.3 92.9 5.49999 91.9 0.899992 91C-0.200008 89.5 1.69999 88.3 0.699992 87C1.99999 86.1 3.19999 86.3 4.49999 86.5C6.69999 87 8.99999 87.5 11.2 88C15 88.8 18.8 89 22.6 88.7C28.9 88.2 35.2 87.7 41.5 86.9C46.1 86.3 50.6 85.2 54.8 83C56.8 82 58.9 81.4 60.9 80.4C62.3 79.6 63.6 78.6 65 77.8C70.6 74.7 75.8 71.1 80.4 66.5C86 61 90.3 54.4999 95 48.2999C100.3 41.1999 102.7 32.9 104.7 24.5C106.3 17.5 108.3 10.6 109 3.39995C109.1 2.49995 109.5 1.69995 109.8 0.799951C110.333 0.799951 110.867 0.766618 111.4 0.699951C111.5 0.999951 111.7 1.29995 111.7 1.49995C111.5 4.09995 111.2 6.69995 111.2 9.29995C111.2 14.9 111.3 20.5 111.3 26.1C111.3 32.5 111.4 38.9 111.4 45.4C111.3 51.5 112.4 57.3 114.8 62.9C115.3 64.1 115.7 65.4 115.9 66.7C116.5 70.5 118.3 73.7 120.9 76.5C123.1 78.8 125 81.2 127.2 83.5C129.9 86.5 133.3 88.6 136.8 90.4C139.8 91.9333 142.7 93.5666 145.5 95.3C149.3 97.6 153.5 98.9 157.8 100C161.7 100.9 165.7 101.8 169.6 102.9C173.7 104 177.8 104.3 181.9 104.7C185.2 105.1 188.5 105.5 192.3 105.9C191.7 106.5 191.4 107 191.2 107C183.4 107.2 175.5 107.3 167.8 107.7C163.5 108 159.3 108.6 155.2 109.4C150.3 110.3 145.4 111.4 140.7 112.7C135.5 114.1 130.4 115.9 125.4 117.7C120.5 119.4 116.5 122.5 112.5 125.9C109.2 128.9 107.6 133 105 136.4C101.4 141 99.7 146.6 98.2 152.2C95.7 161.7 93.2 171.3 91.1 180.9C89 190.7 87.4 200.6 86.7 210.6C86.6 211.8 86.1 212.9 85.7 214.1C85.5 214.4 85 214.7 84.7 214.9C83.8 214.2 83 213.5 82.3 212.8C81.3 212 81.1 210.9 81.2 209.7C81.4 202.8 81.8 195.9 82 189C82.1 183.9 82.4 178.7 82.1 173.6C81.7 167.5 80.9 161.4 79.9 155.4C79.3 151.7 78 148 76.9 144.4C75.6 139.8 73.4 135.6 71.7 131.3C70.7 128.7 68.9 126.5 68.1 123.9C67.9 123.5 67.4 123.3 67.1 123C66.8 122.7 66.4 122.5 66.2 122.2C64.7 118.2 60.9 116.2 58.6 112.8C58.4 112.5 57.8 112.4 57.4 112.2C56.4 111.6 55.2 111.2 55.3 109.9ZM63.9 80.5C64.8 80.8 65.6 80.9 65.8 79.3C65 79.8 64.5 80.2 63.9 80.5Z"
                fill="#100F12"
              />
            </g>
            <defs>
              <clipPath id="clip0_26_34468">
                <rect width="193" height="215" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Center Content */}
        <div className="text-center max-w-3xl z-20 md:mt-0">
          <h3
            className="font-secondary text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.3] md:leading-[1.3] lg:leading-[1.3] xl:leading-[1.3] font-semibold text-black splt-txt"
            data-splitting
            data-aos="fade-in"
          >
            Access Healthcare <br />
            Anytime, Anywhere <br />
            <em className="text-[#dc2626]">with MobiLab2u</em>
          </h3>

          <p className="mt-4 text-base md:text-lg text-gray-600">Try MobiLab2u today.</p>

          {/* Buttons */}
          <div className="mt-6 flex flex-row flex-wrap justify-center gap-2 md:gap-4">
            <Link
              href="/services"
              className="relative overflow-hidden bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold shadow group text-sm md:text-base"
            >
              Explore Services
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-12 group-hover:animate-shine"></span>
            </Link>

            <a
              href="tel:+60125412990"
              className="border border-gray-300 hover:border-black text-black px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold bg-white shadow text-sm md:text-base"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>

      <div className="fixed right-1 sm:right-4 top-1/2 transform -translate-y-1/2 z-50">
        <Link href="https://wa.me/+60125412990?text=How we can help you?" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/svg/whatsapp.gif"
            alt="WhatsApp"
            width={45}
            height={45}
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <Link href="tel:+60125412990" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/images/phone-icon.gif"
            alt="phone"
            width={45}
            height={45}
            className="w-[45px] h-[45px] drop-shadow-md hover:scale-110 transition-transform duration-300 lg:hidden mt-2"
          />
        </Link>
      </div>
    </main>
  )
}
