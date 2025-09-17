<template>
    <div class="table-container">
      <div>
        <label for="language-select">Select Language:</label>
        <select id="language-select" v-model="selectedLanguage">
          <option value="english">English</option>
          <option value="chinese">中文</option>
        </select>
      </div>
  
      <el-table :data="selectedData" style="width: 100%"  class="custom-table">
        <el-table-column prop="classification" label="classification of examination" width="250"></el-table-column>
        <el-table-column prop="explanation" label="components/explanation of examination" width="650"></el-table-column>
        <el-table-column prop="location" label="Location of examination"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
    cardInfo: Object,
    },
    data() {
      return {
        selectedLanguage: 'english',
        pakageAFemale:{
        englishData: [
          {
            classification: 'basic and regular service',
            explanation: 'Measuring B/P, Height, Weight, HR & RR.',
            location: 'G-Floor',
          },
          {
            classification: 'Internal medicine',
            explanation: 'Listening to the lungs, heart; attempting regular examination; screening the common diseases of liver and spleen',
            location: 'OPD/ 1st Floor',
          },
          {
            classification: 'Surgical service',
            explanation: 'Screening the abnormalities of lymph nodes, thyroid gland, breast, anus, prostate et',
            location: 'OPD/ 1st Floor',
          },
          {
            classification: 'E.N.T',
            explanation: 'Screening the diseases of tympanites, rhinitis, pharyngitis, and rhinopolypus',
            location: 'OPD/1st Floor',
          },
          {
            classification: 'Ophthalmology',
            explanation: 'Screening Fundus atherosclerosis, retinal disease, and glaucoma',
            location: '5th Floor',
          },
          {
            classification: 'dentistry',
            explanation: 'Screening the common oral and dental disease',
            location: 'OPD/1st Floor',
          },
          {
            classification: 'Liver function',
            explanation: 'Screening the abnormal of liver',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Renal function',
            explanation: 'Screening the kidney injury, testing BUN and creatinine level',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Lipid panel',
            explanation: 'Testing the level of cholesterol, triacylglycerol, & High/low Density Lipoprotein Cholesterol; Screening the abnormalities of Lipid Blood',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'CBC',
            explanation: 'Screening any anemia, infection, and diseases of blood system',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Urinalysis',
            explanation: 'Screening urinary infection, hematuria, and albuminuria.',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Stool Analysis and occult blood test',
            explanation: 'Screening the symptoms of the parasitization, enteritis, and hemorrhage of gastrointestinal tract',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'ECG',
            explanation: 'Exam whether or not there is arrhythmia, myocardial ischemia, myocardial anoxia, & imbalances of electrolytes such as hyperkalemia, & hypokalemia',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Abdominal Ultrasound(Liver，cholecyst，Spleen, pancreas, and Kidney)',
            explanation: 'Exam the organs of liver, gall, spleen, pancreas, and kidney; testing whether or not there is stone, tumor, and uronephro',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Pelvic Ultrasound(Uterus and Uterine adnexa)',
            explanation: 'Screening the tumor of uterus and uterine adnexa',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Chest X-Ray',
            explanation: 'Examine the structures and organs in your chest',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Breakfast',
            explanation: 'Porridge, side dishes, steamed buns, eggs and other Chinese breakfast',
            location: '10th floor restaurant',
          },
          
        ],
        chineseData: [
          {
            classification: '一般项目',
            explanation: '测血压，身高，体重，心率，呼吸等',
            location: 'G 层大',
          },
          {
            classification: '内科',
            explanation: '听诊心肺，初诊肝脾等基本检查，初步排除常见疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '外科',
            explanation: '了解浅表淋巴结，甲状腺，乳房，肛门（包括指检）外生殖器，前列腺（男）等基本情况',
            location: '1 层内科门诊',
          },
          {
            classification: '耳鼻喉科',
            explanation: '了解有无中耳炎，鼻炎，咽炎，鼻息肉等疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '眼科',
            explanation: '检测眼底动脉有无硬化，了解有无视网膜以及青光眼等眼科疾病',
            location: '5 层眼科门诊',
          },
          {
            classification: '口腔科',
            explanation: '了解有无常见口腔疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '肝功能',
            explanation: '检查肝功能有无异常',
            location: '1 层化验室',
          },
          {
            classification: '肾功能',
            explanation: '检查肾功能有无异常',
            location: '1 层化验室',
          },
          {
            classification: '血脂',
            explanation: '检查血脂有无异常',
            location: '1 层化验室',
          },
          {
            classification: '血常规',
            explanation: '了解有无感染，贫血，以及血液系统疾病',
            location: '1 层化验室',
          },
          {
            classification: '尿常规',
            explanation: '了解有无泌尿系统感染，血尿，以及蛋白尿等',
            location: '1 层化验室',
          },
          {
            classification: '大便常规加隐血试验',
            explanation: '了解有无寄生虫感染，肠炎，胃肠道出血等症状',
            location: '1 层化验室',
          },
          {
            classification: '心电图',
            explanation: '检查有无心律失常，心脏缺血缺氧性疾病和其他非循环系统疾病如血钾异常等',
            location: '2 层心电图室',
          },
          {
            classification: '腹部彩超',
            explanation: '检查肝胆胰脾肾等器官，了解有',
            location: '2 层心电图室',
          }, {
            classification: '子宫及附件彩超',
            explanation: '检测有无子宫及附件肿瘤等疾病',
            location: '2 层心电图室',
          },
          {
            classification: '腰椎正侧位片',
            explanation: '了解有无腰椎增生等疾病',
            location: '2 层心电图室',
          },
          {
            classification: '早餐',
            explanation: '粥，小菜，馒头，鸡蛋等中式早餐',
            location: '10 层餐厅',
          },
        ]
        },
        pakageBFemale:{
        englishData: [
          {
            classification: 'Basic and Regular Service',
            explanation: 'Measuring B/P, Height, Weight, HR & RR.',
            location: 'G-Floor',
          },
          {
            classification: 'Internal Medicine',
            explanation: 'Listening to the lungs, heart; attempting regular examination; screening the common diseases of liver and spleen',
            location: 'OPD/ 1st Floor',
          },
          {
            classification: 'Surgical Service',
            explanation: 'Screening the abnormalities of lymph nodes, thyroid gland, breast, anus, prostate et',
            location: 'OPD/ 1st Floor',
          },
          {
            classification: 'E.N.T',
            explanation: 'Screening the diseases of tympanites, rhinitis, pharyngitis, and rhinopolypus',
            location: 'OPD/1st Floor',
          },
          {
            classification: 'Ophthalmology',
            explanation: 'Screening Fundus atherosclerosis, retinal disease, and glaucoma',
            location: '5th Floor',
          },
          {
            classification: 'Dentistry',
            explanation: 'Screening the common oral and dental disease',
            location: 'OPD/1st Floor',
          },
          {
            classification: 'Gynecology and Obstetrics',
            explanation: 'Screening external diseases and uterine cervix examination',
            location: 'OPD/1st Floor',
          },
          {
            classification: 'Chemistry-26 Panel',
            explanation: 'Screening the abnormalities of liver, kidney injury, testing the level of cholesterol, triacylglycerol, and High/low Density Lipoprotein, Screening the abnormalities of Lipid Blood, testing the level of blood glucose',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'PT and PTT',
            explanation: 'Coagulation Profile, Screening blood clotting disorder',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Thyroid function（T3，T4，TSH）',
            explanation: 'Screening hyperthyroidism or Hypothyroidism.',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'alpha-fetoprotein',
            explanation: 'As the relative diagnosis of primary carcinoma of liver, virus hepatitis, and cirrhosis',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Carcinoembryonic antigen',
            explanation: 'As the relative diagnosis of colorectal cancer, lung cancer, pancreatic cancer, breast cancer, bladder cancer, gonadal carcinoma, and leucocythemia',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'CA125，CA153',
            explanation: 'As the relative diagnosis of oophoroma and breast cancer',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Hepatitis B',
            explanation: 'Testing whether or not there is Hepatitis B Virus and protective antibody of Hepatitis B',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Complete Blood Count(CBC)',
            explanation: 'Screening any anemia, infection, and diseases of blood syste',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Urine Test',
            explanation: 'Screening urinary infection, hematuria, and albuminuria',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Stool analysis and occult blood test',
            explanation: 'Screening the symptoms of the parasitization, enteritis, & hemorrhage of gastrointestinal tract.',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'ECG',
            explanation: 'Exam whether or not there is arrhythmia, myocardial ischemia, myocardial anoxia, and imbalances of electrolytes such as hyperkalemia, and hypokalemia.',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Lung CT scan',
            explanation: 'Testing whether or not there are any abnormalities of the anatomy/structures of lungs, TB, and Lung cancer',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Ultrasound of abdomen',
            explanation: 'Exam the organs of liver, gall, spleen, pancreas, and kidney; testing whether or not there is stone, tumor, and uronephrosis.',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Ultrasound of tyroid',
            explanation: 'Testing whether there is the protuberance, knub, and abnormally enlarged thyroide gland',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Ultrasound of pelvis (female)',
            explanation: 'Screening the tumor of uterus and uterine adnexa',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'X-Ray film to L-Spine PA & LA',
            explanation: 'Screening the hyperosteogeny of Lumbar vertebra',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Breakfast',
            explanation: 'Porridge, side dishes, steamed buns, eggs and other Chinese breakfast',
            location: '10th floor restaurant',
          },
          
        ],
        chineseData: [
          {
            classification: '一般项目',
            explanation: '测血压，身高，体重，心率，呼吸等',
            location: 'G 层大',
          },
          {
            classification: '内科',
            explanation: '听诊心肺，初诊肝脾等基本检查，初步排除常见疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '外科',
            explanation: '了解浅表淋巴结，甲状腺，乳房，肛门（包括指检）外生殖器，前列腺（男）等基本情况',
            location: '1 层内科门诊',
          },
          {
            classification: '耳鼻喉科',
            explanation: '了解有无中耳炎，鼻炎，咽炎，鼻息肉等疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '眼科',
            explanation: '检测眼底动脉有无硬化，了解有无视网膜以及青光眼等眼科疾病',
            location: '5 层眼科门诊',
          },
          {
            classification: '口腔科',
            explanation: '了解有无常见口腔疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '妇产科',
            explanation: '了解有无外部疾病以及宫颈检查',
            location: '1 层内科门诊',
          },
          {
            classification: '生化 26',
            explanation: '筛查肝功能、肾功能、血脂、血糖、痛风及电解质',
            location: '1 层化验室',
          },
          {
            classification: '凝血酶原与活化凝血活酶时间',
            explanation: '检测凝血酶原时间和活化凝血酶原时间水平',
            location: '1 层化验室',
          },
          {
            classification: '甲状腺功能三项',
            explanation: '有无甲状腺功能亢进或减退',
            location: '1 层化验室',
          },
          {
            classification: '甲胎蛋白 (AFP)',
            explanation: '作为原发性肝癌，病毒性肝炎，肝硬化的辅助判断',
            location: '1 层化验室',
          },
          {
            classification: '癌胚抗原（CEA）',
            explanation: '作为大肠癌，肺癌，胰腺癌，乳腺癌，泌尿生殖腺癌，白血病的辅助判断',
            location: '1 层化验室',
          },
          {
            classification: '卵巢癌，乳腺癌检测',
            explanation: '作为卵巢癌，乳腺癌的辅助判断',
            location: '1 层化验室',
          },
          {
            classification: '乙肝检测',
            explanation: '了解有无感染乙肝保护性抗体',
            location: '1 层化验室',
          }, {
            classification: '血常规',
            explanation: '了解有无感染，贫血，以及血液系统疾病',
            location: '1 层化验室',
          },
          {
            classification: '尿常规',
            explanation: '了解有无泌尿系统感染，血尿，以及蛋白尿等',
            location: '1 层化验室',
          },
          {
            classification: '大便常规加隐血试验',
            explanation: '了解有无寄生虫感染，肠炎，胃肠道出血等症状',
            location: '1 层化验室',
          },
          {
            classification: '心电图',
            explanation: '检车有无心律失常，心脏缺血缺氧性疾病和其他非循环系统疾病如血钾异常等',
            location: '2 层心电图室',
          },
          {
            classification: '胸部低剂量 CT 检查',
            explanation: '了解肺部结构是否正常，有无肺癌，肺结核等疾病',
            location: '2 层心电图室',
          },
          {
            classification: '甲状腺彩超',
            explanation: '了解甲状腺有无重大，结节，及肿块',
            location: '2 层心电图室',
          },
          {
            classification: '女性子宫及附件彩超',
            explanation: '检测有无子宫及附件肿瘤等疾病',
            location: '2 层心电图室',
          },
          {
            classification: '腰椎正侧位片',
            explanation: '了解有无腰椎增生等疾病',
            location: '2 层心电图室',
          },
          {
            classification: '早餐',
            explanation: '粥、馒头、牛奶、鸡蛋及小菜',
            location: '10 层餐厅',
          },
        ]
        },
        packageCFemale:{
  englishData: [
    {
      classification: 'Basic and regular service',  
      explanation: 'Measuring B/P, Height, Weight, HR & RR.',
      location: 'G-Floor',
    },
    {
      classification: 'Internal Medicine',
      explanation: 'Listening to the lungs, heart; attempting regular examination; screening the common diseases of liver and spleen.',
      location: 'OPD/ 1st Floor',
    },
    {
      classification: 'Surgical Service',
      explanation: 'Screening the abnormalities of lymph nodes, thyroid gland, breast, anus, prostate etc.',
      location: 'OPD/ 1st Floor',
    },
    {
      classification: 'E.N.T',
      explanation: 'Screening the diseases of tympanites, rhinitis, pharyngitis, and rhinopolypus.',
      location: 'OPD/1st Floor',
    },
    {
      classification: 'Ophthalmology', 
      explanation: 'Screening Fundus atherosclerosis, retinal disease, and glaucoma.',
      location: '5th Floor',
    },
    {
      classification: 'Dentistry',
      explanation: 'Screening the common oral and dental diseases.',
      location: 'OPD/1st Floor',
    },
    {  
      classification: 'Gynecology and Obstetrics',
      explanation: 'Screening external diseases and uterine cervix examination.',
      location: 'OPD/1st Floor',
    },
    {
      classification: 'Colposcopy',
      explanation: 'To examine the cervix for any abnormality',
      location: 'OPD/1st Floor',
    },
    {
      classification: 'Wet Film',
      explanation: 'To screen infection of vagina (vaginitis)',
      location: 'OPD/1st Floor',  
    },
    {
      classification: 'Chemistry-26 Panel',
      explanation: 'Screening the abnormalities of liver, kidney injury, testing the level of cholesterol, triacylglycerol, and High/low Density Lipoprotein, Screening the abnormalities of Lipid Blood, testing the level of blood glucose',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'PT and PTT',
      explanation: 'Coagulation Profile, Screening blood clotting disorder',
      location: 'LAB/1st Floor',  
    },
    {
      classification: 'T3 T4 TSH',
      explanation: 'Screening hyperthyroidism or Hypothyroidism.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'alpha-fetoprotein',
      explanation: 'As the relative diagnosis of primary carcinoma of liver, virus hepatitis, and cirrhosis',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Carcinoembryonic antigen',
      explanation: 'As the relative diagnosis of colorectal cancer, lung cancer, pancreatic cancer, breast cancer, bladder cancer, gonadal carcinoma, and leucocythemia.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'CA125,CA153',
      explanation: 'As the relative diagnosis of oophoroma and breast cancer.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Rheumatism Package',
      explanation: 'Testing Antistreptolysin O, C-Reactive Protein (CRP), rheumatoid factor to facilitate the diagnosis of rheumatic disease such as rheumatoid arthritis.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Hepatitis B',
      explanation: 'Testing whether or not there is Hepatitis B Virus and protective antibody of Hepatitis B.',
      location: 'LAB/1st Floor', 
    },
    {
      classification: 'Complete Blood Count (CBC)',
      explanation: 'Screening any anemia, infection, and diseases of blood system.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Urine Test',
      explanation: 'Screening urinary infection, hematuria, and albuminuria.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Stool analysis and occult blood test',
      explanation: 'Screening the symptoms of the parasitization, enteritis, & hemorrhage of gastrointestinal tract', 
      location: 'LAB/1st Floor',
    },
    {
      classification: 'ECG',
      explanation: 'Exam whether or not there is arrhythmia, myocardial ischemia, myocardial anoxia, and imbalances of electrolytes such as hyperkalemia, and hypokalemia.',
      location: 'RAD/2nd Floor', 
    },
    {
      classification: 'Lung CT scan',
      explanation: 'Testing whether or not there are any abnormalities of the anatomy/structures of lungs, TB, and Lung cancer.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Ultrasound of abdomen',
      explanation: 'Exam the organs of liver, gall, spleen, pancreas, and kidney; testing whether or not there is stone, tumor, and uronephrosis.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Ultrasound of tyroid', 
      explanation: 'Testing whether there is the protuberance, knub, and abnormally enlarged thyroide gland,',
      location: 'RAD/2nd Floor',
    },  
    {
      classification: 'Cardiac echo-doppler examination',
      explanation: 'Screening the abnormalities of heart and regurgitations.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Doppler of brachiocephal vessels',
      explanation: 'Facilitating the diagnosis of the diseases of cerebral arteriosclerosis and inadequate blood flow to the brain.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Ultrasound of pelvis (female)',
      explanation: 'Screening the tumor of uterus and uterine adnexa.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Head MRI',
      explanation: 'Screening the tumor, cerebral infarction, and nasosinusitis.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Cervical Vertebra and Lumbar Vertebra MRI (Choose one)',
      explanation: 'Knowing Cervical disc Herniation, lumbar disc herniation, tumor, and myeleterosis.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Breakfast',
      explanation: 'Porridge, steamed buns, eggs and other Chinese breakfast',
      location: '10th floor restaurant',
    }
  ],

  chineseData: [
    {
      classification: '一般项目',
      explanation: '测血压,身高,体重,心率,呼吸等',
      location: 'G 层大厅',
    },
    {
      classification: '内科',  
      explanation: '听诊心肺,初诊肝脾等基本检查,初步排除常见疾病',
      location: '1 层内科门诊',
    },
    {
      classification: '外科',
      explanation: '了解浅表淋巴结,甲状腺,乳房,肛门(包括指检)外生殖器,前列腺(男)等基本情况',
      location: '1 层内科门诊',
    },
    {
      classification: '耳鼻喉科',
      explanation: '了解有无中耳炎,鼻炎,咽炎,鼻息肉等疾病',  
      location: '1 层内科门诊',
    },
    {
      classification: '眼科',
      explanation: '检测眼底动脉有无硬化,了解有无视网膜以及青光眼等眼科疾病',
      location: '5 层眼科门诊',
    },
    {
      classification: '口腔科',
      explanation: '了解有无常见口腔疾病',
      location: '1 层内科门诊',
    },
    {
      classification: '妇产科',
      explanation: '了解有无外部疾病以及宫颈检查',
      location: '1 层内科门诊',  
    },
    {
      classification: '阴道镜检查',
      explanation: '检测宫颈,阴道以及外阴',
      location: '1 层内科门诊',
    },
    {
      classification: '阴道分泌物检查',
      explanation: '检测引导分泌物有无异常', 
      location: '1 层内科门诊',
    },
    {
      classification: '生化 26',
      explanation: '筛查肝功能、肾功能、血脂、血糖、痛风及电解质',
      location: '1 层化验室',
    },
    {
      classification: '凝血酶原与活化凝血活酶时间',
      explanation: '检测凝血酶原时间和活化凝血酶原时间水平',
      location: '1 层化验室',
    },
    {
      classification: '甲状腺功能三项',
      explanation: '有无甲状腺功能亢进或减退',  
      location: '1 层化验室',
    },
    {
      classification: '甲胎蛋白(AFP)', 
      explanation: '作为原发性肝癌,病毒性肝炎,肝硬化的辅助判断',
      location: '1 层化验室',
    },
    {
      classification: '癌胚抗原(CEA)',
      explanation: '作为大肠癌,肺癌,胰腺癌,乳腺癌,泌尿生殖腺癌,白血病的辅助判断',
      location: '1 层化验室', 
    },
    {
      classification: 'CA125,CA153',
      explanation: '作为卵巢癌,乳腺癌的辅助判断',
      location: '1 层化验室',
    },
    {
      classification: '风湿全套',
      explanation: '查抗 ASO,C-反应蛋白,类风湿因子,用于诊断类风湿性关节炎等风湿性疾病',
      location: '1 层化验室',
    },
    {
      classification: '乙肝检测', 
      explanation: '了解有无感染乙肝保护性抗体',
      location: '1 层化验室',
    },
    {
      classification: '血常规',
      explanation: '了解有无感染,贫血,以及血液系统疾病',
      location: '1 层化验室',
    },
    {
      classification: '尿常规',
      explanation: '了解有无泌尿系统感染,血尿,以及蛋白尿等',
      location: '1 层化验室',
    },
    {
      classification: '大便常规加隐血试验',
      explanation: '了解有无寄生虫感染,肠炎,胃肠道出血等症状',
      location: '1 层化验室',
    },
    {
      classification: '心电图',
      explanation: '检查有无心律失常,心脏缺血缺氧性疾病和其他非循环系统疾病如血钾异常等',
      location: '2 层心电图室', 
    },
    {
      classification: '胸部低剂量 CT 检查',
      explanation: '了解肺部结构是否正常,有无肺癌,肺结核等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '腹部彩超',
      explanation: '检查肝胆胰脾肾等器官,了解有无结石,肿瘤,肾积水等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '甲状腺彩超',  
      explanation: '了解甲状腺有无重大,结节,及肿块',
      location: '2 层心电图室',
    },
    {
      classification: '心脏彩超',
      explanation: '了解心脏结构有无异常,有无反流等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '经颅多普勒(TCD)',
      explanation: '用于脑动脉硬化,脑部供血不足等疾病的辅助诊断',
      location: '2 层心电图室',
    },
    {
      classification: '女性子宫及附件彩超',
      explanation: '检测有无子宫及附件肿瘤等疾病',  
      location: '2 层心电图室',
    },
    {
      classification: '头颅 MRI',
      explanation: '检查有无脑肿瘤,脑梗塞,鼻窦炎等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '颈椎或腰椎 MRI 二选一',
      explanation: '了解颈椎或腰椎间盘突出,肿瘤及脊髓病变等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '早餐',
      explanation: '粥,小菜,馒头,鸡蛋等中式早餐',
      location: '10 层餐厅',
    }
  ]
},
pakageAMale:{
        englishData: [
          {
            classification: 'basic and regular service',
            explanation: 'Measuring B/P, Height, Weight, HR & RR.',
            location: 'G-Floor',
          },
          {
            classification: 'Internal medicine',
            explanation: 'Listening to the lungs, heart; attempting regular examination; screening the common diseases of liver and spleen',
            location: 'OPD/ 1st Floor',
          },
          {
            classification: 'Surgical service',
            explanation: 'Screening the abnormalities of lymph nodes, thyroid gland, breast, anus, prostate et',
            location: 'OPD/ 1st Floor',
          },
          {
            classification: 'E.N.T',
            explanation: 'Screening the diseases of tympanites, rhinitis, pharyngitis, and rhinopolypus',
            location: 'OPD/1st Floor',
          },
          {
            classification: 'Ophthalmology',
            explanation: 'Screening Fundus atherosclerosis, retinal disease, and glaucoma',
            location: '5th Floor',
          },
          {
            classification: 'dentistry',
            explanation: 'Screening the common oral and dental disease',
            location: 'OPD/1st Floor',
          },
          {
            classification: 'Liver function',
            explanation: 'Screening the abnormal of liver',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Renal function',
            explanation: 'Screening the kidney injury, testing BUN and creatinine level',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Lipid panel',
            explanation: 'Testing the level of cholesterol, triacylglycerol, & High/low Density Lipoprotein Cholesterol; Screening the abnormalities of Lipid Blood',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'CBC',
            explanation: 'Screening any anemia, infection, and diseases of blood system',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Urinalysis',
            explanation: 'Screening urinary infection, hematuria, and albuminuria.',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'Stool Analysis and occult blood test',
            explanation: 'Screening the symptoms of the parasitization, enteritis, and hemorrhage of gastrointestinal tract',
            location: 'LAB/1st Floor',
          },
          {
            classification: 'ECG',
            explanation: 'Exam whether or not there is arrhythmia, myocardial ischemia, myocardial anoxia, & imbalances of electrolytes such as hyperkalemia, & hypokalemia',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Abdominal Ultrasound(Liver，cholecyst，Spleen, pancreas, and Kidney)',
            explanation: 'Exam the organs of liver, gall, spleen, pancreas, and kidney; testing whether or not there is stone, tumor, and uronephro',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Pelvic Ultrasound(Uterus and Uterine adnexa)',
            explanation: 'Screening the tumor of uterus and uterine adnexa',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Chest X-Ray',
            explanation: 'Examine the structures and organs in your chest',
            location: 'RAD/2nd Floor',
          },
          {
            classification: 'Breakfast',
            explanation: 'Porridge, side dishes, steamed buns, eggs and other Chinese breakfast',
            location: '10th floor restaurant',
          },
          
        ],
        chineseData: [
          {
            classification: '一般项目',
            explanation: '测血压，身高，体重，心率，呼吸等',
            location: 'G 层大',
          },
          {
            classification: '内科',
            explanation: '听诊心肺，初诊肝脾等基本检查，初步排除常见疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '外科',
            explanation: '了解浅表淋巴结，甲状腺，乳房，肛门（包括指检）外生殖器，前列腺（男）等基本情况',
            location: '1 层内科门诊',
          },
          {
            classification: '耳鼻喉科',
            explanation: '了解有无中耳炎，鼻炎，咽炎，鼻息肉等疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '眼科',
            explanation: '检测眼底动脉有无硬化，了解有无视网膜以及青光眼等眼科疾病',
            location: '5 层眼科门诊',
          },
          {
            classification: '口腔科',
            explanation: '了解有无常见口腔疾病',
            location: '1 层内科门诊',
          },
          {
            classification: '肝功能',
            explanation: '检查肝功能有无异常',
            location: '1 层化验室',
          },
          {
            classification: '肾功能',
            explanation: '检查肾功能有无异常',
            location: '1 层化验室',
          },
          {
            classification: '血脂',
            explanation: '检查血脂有无异常',
            location: '1 层化验室',
          },
          {
            classification: '血常规',
            explanation: '了解有无感染，贫血，以及血液系统疾病',
            location: '1 层化验室',
          },
          {
            classification: '尿常规',
            explanation: '了解有无泌尿系统感染，血尿，以及蛋白尿等',
            location: '1 层化验室',
          },
          {
            classification: '大便常规加隐血试验',
            explanation: '了解有无寄生虫感染，肠炎，胃肠道出血等症状',
            location: '1 层化验室',
          },
          {
            classification: '心电图',
            explanation: '检查有无心律失常，心脏缺血缺氧性疾病和其他非循环系统疾病如血钾异常等',
            location: '2 层心电图室',
          },
          {
            classification: '腹部彩超',
            explanation: '检查肝胆胰脾肾等器官，了解有',
            location: '2 层心电图室',
          }, {
            classification: '子宫及附件彩超',
            explanation: '检测有无子宫及附件肿瘤等疾病',
            location: '2 层心电图室',
          },
          {
            classification: '腰椎正侧位片',
            explanation: '了解有无腰椎增生等疾病',
            location: '2 层心电图室',
          },
          {
            classification: '早餐',
            explanation: '粥，小菜，馒头，鸡蛋等中式早餐',
            location: '10 层餐厅',
          },
        ]
        },
 pakageBMale : {
  englishData: [
    {
      classification: 'Basic and regular service',
      explanation: 'Measuring B/P, Height, Weight, HR & RR.',
      location: 'G-Floor',
    },
    {
      classification: 'Internal Medicine',
      explanation: 'Listening to the lungs, heart; attempting regular examination; screening the common diseases of liver and spleen.',
      location: 'OPD/ 1st Floor',
    },
    {
      classification: 'Surgical Service',
      explanation: 'Screening the abnormalities of lymph nodes, thyroid gland, breast, anus, prostate etc.',
      location: 'OPD/ 1st Floor', 
    },
    {
      classification: 'E.N.T',
      explanation: 'Screening the diseases of tympanites, rhinitis, pharyngitis, and rhinopolypus.',
      location: 'OPD/1st Floor',
    },
    {
      classification: 'Ophthalmology',
      explanation: 'Screening Fundus atherosclerosis, retinal disease, and glaucoma.',
      location: '5th Floor',
    },
    {
      classification: 'Dentistry',
      explanation: 'Screening the common oral and dental diseases.',
      location: 'OPD/1st Floor',
    },
    {
      classification: 'Chemistry-26 Panel',
      explanation: 'Screening the abnormalities of liver, kidney injury, testing the level of cholesterol, triacylglycerol, and High/low Density Lipoprotein, Screening the abnormalities of Lipid Blood, testing the level of blood glucose',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'PT and PTT',
      explanation: 'Coagulation Profile, Screening blood clotting disorder',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Thyroid function(T3,T4,TSH)',
      explanation: 'Screening hyperthyroidism or Hypothyroidism.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'alpha-fetoprotein',
      explanation: 'As the relative diagnosis of primary carcinoma of liver, virus hepatitis, and cirrhosis',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Carcinoembryonic antigen',
      explanation: 'As the relative diagnosis of colorectal cancer, lung cancer, pancreatic cancer, breast cancer, bladder cancer, gonadal carcinoma, and leucocythemia.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Prostate specific antigen',
      explanation: 'Screening prostatic carcinoma',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Hepatitis B',
      explanation: 'Testing whether or not there is Hepatitis B Virus and protective antibody of Hepatitis B.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Complete Blood Count (CBC)',
      explanation: 'Screening any anemia, infection, and diseases of blood system.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Urine Test',
      explanation: 'Screening urinary infection, hematuria, and albuminuria.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Stool analysis and occult blood test',
      explanation: 'Screening the symptoms of the parasitization, enteritis, & hemorrhage of gastrointestinal tract.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'ECG',
      explanation: 'Exam whether or not there is arrhythmia, myocardial ischemia, myocardial anoxia, and imbalances of electrolytes such as hyperkalemia, and hypokalemia.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Lung CT scan',
      explanation: 'Testing whether or not there are any abnormalities of the anatomy/structures of lungs, TB, and Lung cancer.',
      location: 'RAD/2nd Floor',  
    },
    {
      classification: 'Ultrasound of abdomen',
      explanation: 'Exam the organs of liver, gall, spleen, pancreas, and kidney; testing whether or not there is stone, tumor, and uronephrosis.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Ultrasound of tyroid',
      explanation: 'Testing whether there is the protuberance, knub, and abnormally enlarged thyroide gland,',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Ultrasound of pelvis (male)',
      explanation: 'Exam whether or not there is stone, tumor in the gall bladder; screening whether or not there is hyperplasia and knub of prostate.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'X-Ray film to L-Spine PA & LAT',
      explanation: 'Screening the hyperosteogeny of Lumbar vertebra',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Breakfast',
      explanation: 'Porridge, side dishes, steamed buns, eggs and other Chinese breakfast',
      location: '10th floor restaurant',
    },
  ],

  chineseData: [
    {
      classification: '一般项目',
      explanation: '测血压,身高,体重,心率,呼吸等',
      location: 'G 层大厅',
    },
    {
      classification: '内科',
      explanation: '听诊心肺,初诊肝脾等基本检查,初步排除常见疾病',
      location: '1 层内科门诊',
    },
    {
      classification: '外科',
      explanation: '了解浅表淋巴结,甲状腺,乳房,肛门(包括指检)外生殖器,前列腺(男)等基本情况',
      location: '1 层内科门诊',
    },
    {
      classification: '耳鼻喉科',
      explanation: '了解有无中耳炎,鼻炎,咽炎,鼻息肉等疾病',
      location: '1 层内科门诊', 
    },
    {
      classification: '眼科',
      explanation: '检测眼底动脉有无硬化,了解有无视网膜以及青光眼等眼科疾病',
      location: '5 层眼科门诊',
    },
    {
      classification: '口腔科',
      explanation: '了解有无常见口腔疾病',
      location: '1 层内科门诊',
    },
    {
      classification: '生化 26',
      explanation: '筛查肝功能、肾功能、血脂、血糖、痛风及电解质',
      location: '1 层化验室',
    },
    {
      classification: '凝血酶原与活化凝血活酶时间',
      explanation: '检测凝血酶原时间和活化凝血酶原时间水平',
      location: '1 层化验室',
    },
    {
      classification: '甲状腺功能三项',
      explanation: '有无甲状腺功能亢进或减退',
      location: '1 层化验室',
    },
    {
      classification: '甲胎蛋白(AFP)',
      explanation: '作为原发性肝癌,病毒性肝炎,肝硬化的辅助判断',
      location: '1 层化验室',
    },
    {
      classification: '癌胚抗原(CEA)',
      explanation: '作为大肠癌,肺癌,胰腺癌,乳腺癌,泌尿生殖腺癌,白血病的辅助判断',  
      location: '1 层化验室',
    },
    {
      classification: '男性前列腺特异性抗原(PSA)',
      explanation: '初步筛查前列腺癌',
      location: '1 层化验室',
    },
    {
      classification: '乙肝检测',
      explanation: '了解有无感染乙肝保护性抗体',
      location: '1 层化验室',
    },
    {
      classification: '血常规',
      explanation: '了解有无感染,贫血,以及血液系统疾病',
      location: '1 层化验室',
    },
    {
      classification: '尿常规', 
      explanation: '了解有无泌尿系统感染,血尿,以及蛋白尿等',
      location: '1 层化验室',
    },
    {
      classification: '大便常规加隐血试验',
      explanation: '了解有无寄生虫感染,肠炎,胃肠道出血等症状',
      location: '1 层化验室',
    },
    {
      classification: '心电图',
      explanation: '检查有无心律失常,心脏缺血缺氧性疾病和其他非循环系统疾病如血钾异常等',
      location: '2 层心电图室',
    },
    {
      classification: '胸部低剂量 CT 检查',
      explanation: '了解肺部结构是否正常,有无肺癌,肺结核等疾病',
      location: '2 层心电图室', 
    },
    {
      classification: '腹部彩超',
      explanation: '检查肝胆胰脾肾等器官,了解有无结石,肿瘤,肾积水等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '甲状腺彩超',
      explanation: '了解甲状腺有无重大,结节,及肿块',
      location: '2 层心电图室',  
    },
    {
      classification: '男性膀胱前列腺彩超',  
      explanation: '检查膀胱有无解释及肿瘤,检查前列腺有无增生,肿块等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '腰椎正侧位片',
      explanation: '了解有无腰椎增生等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '早餐',
      explanation: '粥,小菜,馒头,鸡蛋等中式早餐',
      location: '10 层餐厅',
    },
  ]
},
pakageCMale: {
  englishData: [
    {
      classification: 'Basic and regular service',
      explanation: 'Measuring B/P, Height, Weight, HR & RR.',
      location: 'G-Floor',
    },
    {
      classification: 'Internal Medicine',
      explanation: 'Listening to the lungs, heart; attempting regular examination; screening the common diseases of liver and spleen.',
      location: 'OPD/ 1st Floor',
    },
    {
      classification: 'Surgical Service',
      explanation: 'Screening the abnormalities of lymph nodes, thyroid gland, breast, anus, prostate etc.',
      location: 'OPD/ 1st Floor',
    },
    {
      classification: 'E.N.T',
      explanation: 'Screening the diseases of tympanites, rhinitis, pharyngitis, and rhinopolypus.',
      location: 'OPD/ 1st Floor',
    },
    {
      classification: 'Ophthalmology',
      explanation: 'Screening Fundus atherosclerosis, retinal disease, and glaucoma.',
      location: '5th Floor',
    },
    {
      classification: 'Dentistry',
      explanation: 'Screening the common oral and dental diseases.',
      location: 'OPD/ 1st Floor',
    },
    {
      classification: 'Chemistry-26 Panel',
      explanation: 'Screening the abnormalities of liver, kidney injury, testing the level of cholesterol, triacylglycerol, and High/low Density Lipoprotein, Screening the abnormalities of Lipid Blood, testing the level of blood glucose',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'PT and PTT',
      explanation: 'Coagulation Profile, Screening blood clotting disorder',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'T3 T4 TSH',
      explanation: 'Screening hyperthyroidism or Hypothyroidism.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'alpha-fetoprotein',
      explanation: 'As the relative diagnosis of primary carcinoma of liver, virus hepatitis, and cirrhosis',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Carcinoembryonic antigen', 
      explanation: 'As the relative diagnosis of colorectal cancer, lung cancer, pancreatic cancer, breast cancer, bladder cancer, gonadal carcinoma, and leucocythemia.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Prostate specific antigen',
      explanation: 'Screening prostatic carcinoma',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Rheumatism Package',
      explanation: 'Testing Antistreptolysin O, C-Reactive Protein (CRP), rheumatoid factor to facilitate the diagnosis of rheumatic disease such as rheumatoid arthritis.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Hepatitis B',
      explanation: 'Testing whether or not there is Hepatitis B Virus and protective antibody of Hepatitis B.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Complete Blood Count (CBC)',
      explanation: 'Screening any anemia, infection, and diseases of blood system.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Urine Test',
      explanation: 'Screening urinary infection, hematuria, and albuminuria.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'Stool analysis and occult blood test',
      explanation: 'Screening the symptoms of the parasitization, enteritis, & hemorrhage of gastrointestinal tract.',
      location: 'LAB/1st Floor',
    },
    {
      classification: 'ECG',
      explanation: 'Exam whether or not there is arrhythmia, myocardial ischemia, myocardial anoxia, and imbalances of electrolytes such as hyperkalemia, and hypokalemia.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Lung CT scan',
      explanation: 'Testing whether or not there are any abnormalities of the anatomy/structures of lungs, TB, and Lung cancer.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Ultrasound of abdomen',
      explanation: 'Exam the organs of liver, gall, spleen, pancreas, and kidney; testing whether or not there is stone, tumor, and uronephrosis.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Ultrasound of tyroid',
      explanation: 'Testing whether there is the protuberance, knub, and abnormally enlarged thyroide gland,',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Cardiac echo-doppler examination',
      explanation: 'Screening the abnormalities of heart and regurgitations.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Doppler of brachiocephal vessels',
      explanation: 'Facilitating the diagnosis of the diseases of cerebral arteriosclerosis and inadequate blood flow to the brain.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Ultrasound of pelvis (male)',
      explanation: 'Exam whether or not there is stone, tumor in the gall bladder; screening whether or not there is hyperplasia and knub of prostate.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Head MRI',
      explanation: 'Screening the tumor, cerebral infarction, and nasosinusitis.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Cervical Vertebra and Lumbar Vertebra MRI (Choose one)',
      explanation: 'Knowing Cervical disc Herniation, lumbar disc herniation, tumor, and myeleterosis.',
      location: 'RAD/2nd Floor',
    },
    {
      classification: 'Breakfast',
      explanation: 'Porridge, side dishes, steamed buns, eggs and other Chinese breakfast',
      location: '10th floor restaurant',
    }
  ],

  chineseData: [
    {
      classification: '一般项目',
      explanation: '测血压,身高,体重,心率,呼吸等',
      location: 'G 层大厅',
    },
    {
      classification: '内科',
      explanation: '听诊心肺,初诊肝脾等基本检查,初步排除常见疾病',  
      location: '1 层内科门诊',
    },
    {
      classification: '外科',
      explanation: '了解浅表淋巴结,甲状腺,乳房,肛门(包括指检)外生殖器,前列腺(男)等基本情况',
      location: '1 层内科门诊',
    },
    {
      classification: '耳鼻喉科',
      explanation: '了解有无中耳炎,鼻炎,咽炎,鼻息肉等疾病',
      location: '1 层内科门诊',
    },
    {
      classification: '眼科',
      explanation: '检测眼底动脉有无硬化,了解有无视网膜以及青光眼等眼科疾病',
      location: '5 层眼科门诊',
    },
    {
      classification: '口腔科',
      explanation: '了解有无常见口腔疾病',
      location: '1 层内科门诊',
    },
    {
      classification: '生化 26',
      explanation: '筛查肝功能、肾功能、血脂、血糖、痛风及电解质',
      location: '1 层化验室',
    },
    {
      classification: '凝血酶原与活化凝血活酶时间',
      explanation: '检测凝血酶原时间和活化凝血酶原时间水平',
      location: '1 层化验室',
    },
    {
      classification: '甲状腺功能三项',
      explanation: '有无甲状腺功能亢进或减退',
      location: '1 层化验室',
    },
    {
      classification: '甲胎蛋白(AFP)',
      explanation: '作为原发性肝癌,病毒性肝炎,肝硬化的辅助判断',
      location: '1 层化验室',
    },
    {
      classification: '癌胚抗原(CEA)',
      explanation: '作为大肠癌,肺癌,胰腺癌,乳腺癌,泌尿生殖腺癌,白血病的辅助判断',
      location: '1 层化验室',
    },
    {
      classification: '男性前列腺特异性抗原(PSA)',
      explanation: '初步筛查前列腺癌', 
      location: '1 层化验室',
    },
    {
      classification: '风湿全套',
      explanation: '查抗 ASO,C-反应蛋白,类风湿因子,用于诊断类风湿性关节炎等风湿性疾病',
      location: '1 层化验室',
    },
    {
      classification: '乙肝检测',
      explanation: '了解有无感染乙肝保护性抗体',
      location: '1 层化验室',
    },
    {
      classification: '血常规',
      explanation: '了解有无感染,贫血,以及血液系统疾病', 
      location: '1 层化验室',
    },
    {
      classification: '尿常规',
      explanation: '了解有无泌尿系统感染,血尿,以及蛋白尿等',
      location: '1 层化验室',
    },
    {
      classification: '大便常规加隐血试验',
      explanation: '了解有无寄生虫感染,肠炎,胃肠道出血等症状',
      location: '1 层化验室',
    },
    {
      classification: '心电图',
      explanation: '检查无心律失常,心脏缺血缺氧性疾病和其他非循环系统疾病如血钾异常等',
      location: '2 层心电图室',
    },
    {
      classification: '胸部低剂量 CT 检查', 
      explanation: '了解肺部结构是否正常,有无肺癌,肺结核等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '腹部彩超',
      explanation: '检查肝胆胰脾肾等器官,了解有无结石,肿瘤,肾积水等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '甲状腺彩超',
      explanation: '了解甲状腺有无重大,结节,及肿块',
      location: '2 层心电图室',
    },
    {
      classification: '心脏彩超',
      explanation: '了解心脏结构有无异常,有无反流等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '经颅多普勒(TCD)',
      explanation: '用于脑动脉硬化,脑部供血不足等疾病的辅助诊断',  
      location: '2 层心电图室',
    },
    {
      classification: '男性膀胱前列腺彩超',
      explanation: '检查膀胱有无解释及肿瘤,检查前列腺有无增生,肿块等疾病', 
      location: '2 层心电图室',
    },
    {
      classification: '头颅 MRI',
      explanation: '检查有无脑肿瘤,脑梗塞,鼻窦炎等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '颈椎或腰椎 MRI 二选一',
      explanation: '了解颈椎或腰椎间盘突出,肿瘤及脊髓病变等疾病',
      location: '2 层心电图室',
    },
    {
      classification: '早餐',  
      explanation: '粥,小菜,馒头,鸡蛋等中式早餐',
      location: '10 层餐厅',
    }
  ]
}
      };
    },
    computed: {
      selectedData() {
        if(this.cardInfo.id == 'ph1001'){ 
            return this.selectedLanguage === 'english' ? this.pakageAFemale.englishData : this.pakageAFemale.chineseData;
        }else if(this.cardInfo.id == 'ph1002'){ 
            return this.selectedLanguage === 'english' ? this.pakageBFemale.englishData : this.pakageBFemale.chineseData;
        }
        else if(this.cardInfo.id == 'ph1003'){ 
            return this.selectedLanguage === 'english' ? this.pakageCFemale.englishData : this.pakageCFemale.chineseData;
        } else if(this.cardInfo.id == 'ph1004'){ 
            return this.selectedLanguage === 'english' ? this.pakageAMale.englishData : this.pakageAMale.chineseData;
        } else if(this.cardInfo.id == 'ph1005'){ 
            return this.selectedLanguage === 'english' ? this.pakageBMale.englishData : this.pakageBMale.chineseData;
        } else if(this.cardInfo.id == 'ph1006'){ 
            return this.selectedLanguage === 'english' ? this.pakageCMale.englishData : this.pakageCMale.chineseData;
        }
        else{
            return this.selectedLanguage === 'english' ? this.pakageAFemale.englishData : this.pakageAFemale.chineseData;  
        }
       
      },
    },
  };
  </script>
  <style scoped>
  /* Add table styles here */
  .table-container {
  margin: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

/* Style the language select */
.language-select {
  margin-bottom: 20px;
}

/* Style the table header */
.custom-table .el-table th {
  background-color: #3498db;
  color: #ffffff;
}

/* Style the table rows */
.custom-table .el-table td {
  padding: 12px;
  border: 1px solid #ccc;
}

/* Add a hover effect to table rows */
.custom-table .el-table-row:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s;
}

/* Style the table borders */
.custom-table {
  border-collapse: collapse;
  border: 1px solid #ccc;
}

  </style>