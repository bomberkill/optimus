import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { IconFile } from '@tabler/icons-react';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
  FileInput,
  Group,
  Input,
  // InputWrapper,
  Loader,
  Radio,
  RadioGroup,
  rem,
  Slider,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { theme } from '@/theme';

export default function Form() {
  const { t } = useTranslation('form');
  const isSmallScreen = useMediaQuery('(min-width: 576px)');
  const [currentStep, setCurrentStep] = useState('step3');
  const [randomCode, setRandomCode] = useState('');
  const [activeResend, setActiveResend] = useState(false);
  const [codeSent, setCodeSent] = useState<'sent' | 'notSent' | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [secondLeft, setSecondLeft] = useState(30);
  const [clientType, setClientType] = useState('Entreprise');
  // var finalData = {
  //   step1: {},
  //   step2: {},
  //   step3: {},
  //   step4: {},
  //   step5: {},
  //   step6: {},
  // };
  type formDataType = {
    [key: string]: any;
  };
  const [formData, setFormData] = useState<formDataType>({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
  });
  const icon = <IconFile style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
  function generateRandomCode() {
    console.log(randomCode);
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random code
  }
  const entrepriseValues = {
    radio1: '',
    radio2: '',
    checkbox1: [],
    radio3: '',
    radio4: '',
    radio5: '',
  };
  const PartnerValues = {
    checkbox1: [],
    radio1: '',
    radio2: '',
    radio3: '',
    radio4: '',
    radio5: '',
    radio6: '',
    radio7: '',
    radio8: '',
    radio9: '',
    radio10: '',
    input: '',
    radio11: '',
    radio12: '',
    radio13: '',
  };
  const stepDatas = {
    initialValues: {
      step1: { email: '' },
      confirmationStep: { code: '' },
      step2: { desc: '', radio: '' },
      step3: { radio: '' },
      step4:
        clientType === 'Entreprise'
          ? { radio1: '', radio2: '', checkbox1: [], radio3: '', radio4: '', radio5: '' }
          : {
              checkbox1: [],
              radio1: '',
              radio2: '',
              radio3: '',
              radio4: '',
              radio5: '',
              radio6: '',
              radio7: '',
              radio8: '',
              radio9: '',
              radio10: '',
              input: '',
              radio11: '',
              radio12: '',
              radio13: '',
            },
      step5: {
        input1: '', // Pour les champs de texte
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        radio1: '', // Pour les boutons radio
        radio2: '',
        radio3: '',
        radio4: '',
        radio5: '',
        radio6: '',
        radio7: '',
        radio8: '',
        radio9: '',
        radio10: '',
      },
      step6: {
        input1: '', // Pour les champs de texte
        input2: '',
        radio1: '', // Pour les boutons radio
        radio2: '',
        input3: '',
        radio3: '',
        radio4: '',
        radio5: '',
        input4: '',
        input5: null,
      },
    },
    validationSchemas: {
      step1: Yup.object().shape({
        email: Yup.string()
          .email(t('validation-schemas.step1.invalid-email'))
          .required(t('validation-schemas.step1.email')),
      }),
      confirmationStep: Yup.object().shape({
        code: Yup.string().required(t('validation-schemas.confirmation-step.code')),
        // .test('code-match', t('validation-schemas.confirmation-step.invalid-code'), function (value) { return value ===randomCode}),
      }),
      step2: Yup.object().shape({
        desc: Yup.string().required(t('validation-schemas.step2.desc')),
        radio: Yup.string().required(t('validation-schemas.step2.radio')),
      }),
      step3: Yup.object().shape({
        radio: Yup.string().required(t('validation-schemas.step2.radio')),
      }),
      step4:
        clientType === 'Entreprise'
          ? Yup.object().shape({
              radio1: Yup.string().required(t('validation-schemas.step2.radio')),
              radio2: Yup.string().required(t('validation-schemas.step2.radio')),
              checkbox1: Yup.array().min(1, t('validation-schemas.step2.radio')),
              radio3: Yup.string().required(t('validation-schemas.step2.radio')),
              radio4: Yup.string().required(t('validation-schemas.step2.radio')),
              radio5: Yup.string().required(t('validation-schemas.step2.radio')),
            })
          : Yup.object().shape({
              checkbox1: Yup.array().min(1, t('validation-schemas.step2.radio')),
              radio1: Yup.string().required(t('validation-schemas.step2.radio')),
              radio2: Yup.string().required(t('validation-schemas.step2.radio')),
              radio3: Yup.string().required(t('validation-schemas.step2.radio')),
              radio4: Yup.string().required(t('validation-schemas.step2.radio')),
              radio5: Yup.string().required(t('validation-schemas.step2.radio')),
              radio6: Yup.string().required(t('validation-schemas.step2.radio')),
              radio7: Yup.string().required(t('validation-schemas.step2.radio')),
              radio8: Yup.string().required(t('validation-schemas.step2.radio')),
              radio9: Yup.string().required(t('validation-schemas.step2.radio')),
              radio10: Yup.string().required(t('validation-schemas.step2.radio')),
              input: Yup.string().when('radio10', (radio10, schema) => {
                return radio10.includes('Oui')
                  ? schema.required(t('validation-schemas.step2.desc'))
                  : schema.notRequired();
              }),
              radio11: Yup.string().required(t('validation-schemas.step2.radio')),
              radio12: Yup.string().required(t('validation-schemas.step2.radio')),
              radio13: Yup.string().required(t('validation-schemas.step2.radio')),
            }),
      step5: Yup.object().shape({
        input1: Yup.number()
          .required(t('validation-schemas.step2.radio'))
          .typeError(t('validation-schemas.step5')), // Validation pour un nombre requis
        input2: Yup.number()
          .required(t('validation-schemas.step2.radio'))
          .typeError(t('validation-schemas.step5')),
        input3: Yup.number()
          .required(t('validation-schemas.step2.radio'))
          .typeError(t('validation-schemas.step5')),
        input4: Yup.number()
          .required(t('validation-schemas.step2.radio'))
          .typeError(t('validation-schemas.step5')),
        input5: Yup.number()
          .required(t('validation-schemas.step2.radio'))
          .typeError(t('validation-schemas.step5')),
        input6: Yup.number()
          .required(t('validation-schemas.step2.radio'))
          .typeError(t('validation-schemas.step5')),
        radio1: Yup.string().required(t('validation-schemas.step2.radio')),
        radio2: Yup.string().required(t('validation-schemas.step2.radio')),
        radio3: Yup.string().required(t('validation-schemas.step2.radio')),
        radio4: Yup.string().required(t('validation-schemas.step2.radio')),
        radio5: Yup.string().required(t('validation-schemas.step2.radio')),
        radio6: Yup.string().required(t('validation-schemas.step2.radio')),
        radio7: Yup.string().required(t('validation-schemas.step2.radio')),
        radio8: Yup.string().required(t('validation-schemas.step2.radio')),
        radio9: Yup.string().required(t('validation-schemas.step2.radio')),
        radio10: Yup.string().required(t('validation-schemas.step2.radio')),
      }),
      step6: Yup.object().shape({
        input1: Yup.string(),
        input2: Yup.string(),
        radio1: Yup.string().required(t('validation-schemas.step2.radio')),
        radio2: Yup.string().required(t('validation-schemas.step2.radio')),
        input3: Yup.string(),
        radio3: Yup.string().required(t('validation-schemas.step2.radio')),
        radio4: Yup.string().required(t('validation-schemas.step2.radio')),
        radio5: Yup.string().required(t('validation-schemas.step2.radio')),
        input4: Yup.string(),
        input5: Yup.mixed().nullable(),
      }),
    },
  };
  const handleFormDataUpdate = (step: string, values: {}) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [step]: step === 'step4' ? {} : prevFormData[step],
      [step]: values,
    }));
    console.log('values', values);
  };
  useEffect(() => {
    const savedStep = localStorage.getItem('currentStep');
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(savedStep);
    }
  }, []);
  const saveToLocalStorage = (savingStep: string, savingData: {}) => {
    localStorage.setItem('formData', JSON.stringify(savingData));
    localStorage.setItem('currentStep', savingStep);
  };
  const stepForms = {
    form: {
      step1: useForm({
        initialValues: stepDatas.initialValues.step1,
        validate: yupResolver(stepDatas.validationSchemas.step1),
      }),
      confirmationStep: useForm({
        initialValues: stepDatas.initialValues.confirmationStep,
        validate: yupResolver(stepDatas.validationSchemas.confirmationStep),
      }),
      step2: useForm({
        initialValues: stepDatas.initialValues.step2,
        validate: yupResolver(stepDatas.validationSchemas.step2),
      }),
      step3: useForm({
        initialValues: stepDatas.initialValues.step3,
        validate: yupResolver(stepDatas.validationSchemas.step3),
      }),
      step4: useForm({
        initialValues: stepDatas.initialValues.step4,
        validate: yupResolver(stepDatas.validationSchemas.step4),
      }),
      step5: useForm({
        initialValues: stepDatas.initialValues.step5,
        validate: yupResolver(stepDatas.validationSchemas.step5),
      }),
      step6: useForm({
        initialValues: stepDatas.initialValues.step6,
        validate: yupResolver(stepDatas.validationSchemas.step6),
      }),
    },
    functions: {
      step1: async () => {
        console.log('allo1', isLoading);
        setIsLoading(true);
        console.log(stepForms.form.step1.values);
        const random = generateRandomCode();
        console.log('random code is', random);
        setRandomCode(random);
        await axios
          .post('/api/send-mail', {
            email: stepForms.form.step1.values.email,
            code: random,
          })
          .then(() => {
            console.log('Verification code sent successfully');
            if (currentStep === 'confirmationStep') setCodeSent('sent');
            setCurrentStep('confirmationStep');
          })
          .catch((err) => {
            console.log('Fail to send verification code', err);
            if (currentStep === 'confirmationStep') setCodeSent('notSent');
          });
        setIsLoading(false);
        console.log('allo3', isLoading);
        setCurrentStep('confirmationStep');
      },
      confirmationStep: () => {
        handleFormDataUpdate('step1', stepForms.form.step1.values);
        // setFormData((prevState) => ({
        //   ...prevState,
        //   email: stepForms.form.step1.values,
        // }));
        console.log(formData);
        setCurrentStep('step2');
        saveToLocalStorage('step2', formData);
      },
      step2: () => {
        handleFormDataUpdate('step2', stepForms.form.step2.values);
        console.log('formadata:', formData);
        setCurrentStep('step3');
        saveToLocalStorage('step3', formData);
      },
      step3: () => {
        handleFormDataUpdate('step3', stepForms.form.step3.values);
        console.log('formadata:', formData);
        setClientType(stepForms.form.step3.values.radio);
        setCurrentStep('step4');
        saveToLocalStorage('step4', formData);
      },
      step4: () => {
        handleFormDataUpdate('step4', stepForms.form.step4.values);
        console.log('formadata:', formData);
        setCurrentStep('step5');
        saveToLocalStorage('step5', formData);
      },
      step5: () => {
        handleFormDataUpdate('step5', stepForms.form.step5.values);
        console.log('formadata:', formData);
        setCurrentStep('step6');
        saveToLocalStorage('step6', formData);
      },
      step6: () => {
        handleFormDataUpdate('step6', stepForms.form.step6.values);
        console.log('formadata:', formData);
        saveToLocalStorage('step6', formData);
      },
    },
  };
  const previousButton = () => {
    switch (currentStep) {
      case 'confirmationStep':
        setCurrentStep('step1');
        saveToLocalStorage('step1', formData);
        break;
      // case "step2": setCurrentStep("confirmationStep");
      //   break;
      case 'step3':
        setCurrentStep('step2');
        saveToLocalStorage('step2', formData);
        break;
      case 'step4':
        setCurrentStep('step3');
        saveToLocalStorage('step3', formData);
        break;
      case 'step5':
        setCurrentStep('step4');
        saveToLocalStorage('step4', formData);
        break;
      case 'step6':
        setCurrentStep('step5');
        saveToLocalStorage('step5', formData);
        break;

      default:
        break;
    }
  };
  const nextButton = () => {
    switch (currentStep) {
      case 'step1':
        stepForms.form.step1.onSubmit(stepForms.functions.step1)();
        break;
      case 'confirmationStep':
        stepForms.form.confirmationStep.onSubmit(stepForms.functions.confirmationStep)();
        break;
      case 'step2':
        stepForms.form.step2.onSubmit(stepForms.functions.step2)();
        break;
      case 'step3':
        stepForms.form.step3.onSubmit(stepForms.functions.step3)();
        break;
      case 'step4':
        stepForms.form.step4.onSubmit(stepForms.functions.step4)();
        break;
      case 'step5':
        stepForms.form.step5.onSubmit(stepForms.functions.step5)();
        break;
      case 'step6':
        stepForms.form.step6.onSubmit(stepForms.functions.step6)();
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (currentStep === 'confirmationStep') {
      setSecondLeft(30); // Réinitialiser à 60 secondes
      setActiveResend(false);
      const interval = setInterval(() => {
        if (secondLeft !== 0) {
          setSecondLeft((prevState) => {
            if (prevState > 0) {
              console.log(prevState);
              return prevState - 1;
            } else {
              clearInterval(interval);
              setActiveResend(true);
              return 0;
            }
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    } else if (currentStep === 'step4') {
      if (clientType === 'Entreprise') {
        // stepForms.form.step4.setValues(entrepriseValues);
        stepForms.form.step4.setInitialValues(entrepriseValues);
        stepForms.form.step4.setValues(entrepriseValues);
      } else if (clientType === 'Partenaires') {
        stepForms.form.step4.setInitialValues(PartnerValues);
        stepForms.form.step4.setValues(PartnerValues);
      }
    }
  }, [currentStep]);
  const step1 = () => {
    return (
      <Box>
        <Text
          // variant="gradient"
          // gradient={{ from: '#EF1D1E ', to: '#EF1D1E' }}
          fz={theme.fontSizes?.lg}
          ta="center"
          fw={900}
          c="dark"
        >
          {t('email.label')}
        </Text>
        <form>
          <TextInput
            pt={isSmallScreen ? theme.spacing?.xl : theme.spacing?.sm}
            pb={theme.spacing?.lg}
            placeholder="example@example.com"
            {...stepForms.form.step1.getInputProps('email')}
            fw={200}
            size="sm"
          />
          <Text fz={theme.fontSizes?.md} ta="center" c={theme.colors?.white?.[9]}>
            {t('email.text')}
          </Text>
        </form>
      </Box>
    );
  };
  const confirmationStep = () => {
    return (
      <Box>
        <Text
          // variant="gradient"
          // gradient={{ from: '#EF1D1E ', to: '#EF1D1E' }}
          fz={theme.fontSizes?.lg}
          ta="center"
          c="dark"
          fw={900}
        >
          {t('code.label')}
        </Text>
        <form>
          <TextInput
            pt={theme.spacing?.xl}
            pb={theme.spacing?.lg}
            placeholder="XXXXXX"
            {...stepForms.form.confirmationStep.getInputProps('code')}
            fw="bold"
            size="sm"
          />
          <Text fz={theme.fontSizes?.md} fw={600} ta="center" c={theme.colors?.white?.[9]}>
            {t('code.text')}
          </Text>
          <Group justify="center" gap={3}>
            <Text
              style={{ cursor: activeResend && codeSent === undefined ? 'pointer' : 'default' }}
              fz={theme.fontSizes?.sm}
              // td="underline"
              fw={600}
              onClick={
                activeResend && codeSent === undefined ? stepForms.functions.step1 : () => {}
              }
              ta="center"
              c={
                activeResend && codeSent === undefined
                  ? '#758ADD'
                  : codeSent === 'notSent'
                    ? theme.colors?.red?.[0]
                    : 'gray'
              }
            >
              {isLoading ? (
                <Loader size={30} color={theme.colors?.red?.[0]} />
              ) : codeSent === 'sent' ? (
                t('code.sent')
              ) : codeSent === 'notSent' ? (
                t('code.not-sent')
              ) : (
                t('code.resend')
              )}
            </Text>
            {secondLeft !== 0 && (
              <Text fz={theme.fontSizes?.sm} fw={600} ta="center" c="dark">
                {` ${secondLeft}s`}
              </Text>
            )}
          </Group>
        </form>
      </Box>
    );
  };
  const step2 = () => {
    return (
      <Box miw="100%">
        <Text fz={rem(30)} ta="center" fw={900} c="dark">
          {t('step2.title')}
        </Text>
        <Text fz={theme.fontSizes?.md} ta="center" fw={900} c={theme.colors?.red?.[0]}>
          {t('step2.subtitle')}
        </Text>
        <form>
          <Textarea
            label={t('step2.input.label')}
            py={theme.spacing?.md}
            autosize
            withAsterisk
            minRows={5}
            placeholder={t('step2.input.placeholder')}
            {...stepForms.form.step2.getInputProps('desc')}
            fw="bold"
            size="sm"
          />
          <RadioGroup
            label={t('step2.radio.label')}
            {...stepForms.form.step2.getInputProps('radio')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              mb={theme.spacing?.sm}
              fw="bold"
              variant="outline"
              color={theme.colors?.red?.[0]}
              value="Service"
              label={t('step2.radio.option1')}
            />
            <Radio
              fw="bold"
              variant="outline"
              color={theme.colors?.red?.[0]}
              value="Produit"
              label={t('step2.radio.option2')}
            />
          </RadioGroup>
        </form>
      </Box>
    );
  };
  const step3 = () => {
    return (
      <Box miw="100%">
        <Text
          // variant="gradient"
          // gradient={{ from: '#EF1D1E ', to: '#EF1D1E' }}
          fz={theme.fontSizes?.md}
          ta="center"
          fw={900}
          c={theme.colors?.red?.[0]}
        >
          {t('step3.subtitle')}
        </Text>
        <form>
          <RadioGroup
            // name="favoriteFramework"
            label={t('step3.radio.label')}
            // description="This is anonymous"
            {...stepForms.form.step3.getInputProps('radio')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              mb={theme.spacing?.sm}
              fw="bold"
              variant="outline"
              color={theme.colors?.red?.[0]}
              value="Entreprise"
              label={t('step3.radio.option1')}
            />
            <Radio
              fw="bold"
              variant="outline"
              color={theme.colors?.red?.[0]}
              value="Partenaires"
              label={t('step3.radio.option2')}
            />
          </RadioGroup>
        </form>
      </Box>
    );
  };
  const step4 = () => {
    return (
      <Box miw="100%">
        {stepForms.form.step3.values.radio === 'Entreprise' ? (
          <>
            <Text fz={theme.fontSizes?.md} ta="center" fw={900} c={theme.colors?.red?.[0]}>
              {t('step4.entreprise.subtitle')}
            </Text>
            <form>
              <RadioGroup
                // name="favoriteFramework"
                label={t('step4.entreprise.radio1.label')}
                // description="This is anonymous"
                {...stepForms.form.step4.getInputProps('radio1')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="1-3"
                  label={t('step4.entreprise.radio1.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="4-10"
                  label={t('step4.entreprise.radio1.option2')}
                />
                <Radio
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="plus de 10"
                  label={t('step4.entreprise.radio1.option3')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.entreprise.radio2.label')}
                {...stepForms.form.step4.getInputProps('radio2')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="0-3 ans"
                  label={t('step4.entreprise.radio2.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="4-10 ans"
                  label={t('step4.entreprise.radio2.option2')}
                />
                <Radio
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="plus de 10 ans"
                  label={t('step4.entreprise.radio2.option3')}
                />
              </RadioGroup>
              <CheckboxGroup
                label={t('step4.entreprise.checkbox.label')}
                description={t('step4.entreprise.checkbox.note')}
                {...stepForms.form.step4.getInputProps('checkbox1')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Ventes"
                  label={t('step4.entreprise.checkbox.option1')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Finances et comptabilite"
                  label={t('step4.entreprise.checkbox.option2')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Direction generale"
                  label={t('step4.entreprise.checkbox.option3')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Ressources humaine"
                  label={t('step4.entreprise.checkbox.option4')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Production"
                  label={t('step4.entreprise.checkbox.option5')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Marketing"
                  label={t('step4.entreprise.checkbox.option6')}
                />
              </CheckboxGroup>
              <RadioGroup
                label={t('step4.entreprise.radio3.label')}
                {...stepForms.form.step4.getInputProps('radio3')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Zone urbaine"
                  label={t('step4.entreprise.radio3.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Zone Rurale"
                  label={t('step4.entreprise.radio3.option2')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.entreprise.radio4.label')}
                {...stepForms.form.step4.getInputProps('radio4')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Jour"
                  label={t('step4.entreprise.radio4.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Semaine"
                  label={t('step4.entreprise.radio4.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Bi-mensuel"
                  label={t('step4.entreprise.radio4.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Mensuel"
                  label={t('step4.entreprise.radio4.option4')}
                />
                <Radio
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Moins frequement"
                  label={t('step4.entreprise.radio4.option5')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.entreprise.radio5.label')}
                {...stepForms.form.step4.getInputProps('radio5')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Directeur"
                  label={t('step4.entreprise.radio5.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Chef de departement"
                  label={t('step4.entreprise.radio5.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Responsable"
                  label={t('step4.entreprise.radio5.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Stagiaire"
                  label={t('step4.entreprise.radio5.option4')}
                />
                <Radio
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Autres"
                  label={t('step4.entreprise.radio5.option5')}
                />
              </RadioGroup>
            </form>
          </>
        ) : (
          <>
            <Text fz={theme.fontSizes?.md} ta="center" fw={900} c={theme.colors?.red?.[0]}>
              {t('step4.customer.subtitle')}
            </Text>
            <form>
              <CheckboxGroup
                label={t('step4.customer.checkbox1.label')}
                description={t('step4.customer.checkbox1.note')}
                {...stepForms.form.step4.getInputProps('checkbox1')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Moins 18"
                  label={t('step4.customer.checkbox1.option1')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="18-24"
                  label={t('step4.customer.checkbox1.option2')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="25-34"
                  label={t('step4.customer.checkbox1.option3')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="35-44"
                  label={t('step4.customer.checkbox1.option4')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="45-54"
                  label={t('step4.customer.checkbox1.option5')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="55-64"
                  label={t('step4.customer.checkbox1.option6')}
                />
                <Checkbox
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Plus de 65"
                  label={t('step4.customer.checkbox1.option7')}
                />
              </CheckboxGroup>
              <RadioGroup
                label={t('step4.customer.radio2.label')}
                {...stepForms.form.step4.getInputProps('radio2')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Zone urbaine"
                  label={t('step4.customer.radio2.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Zone Rurale"
                  label={t('step4.customer.radio2.option2')}
                />
              </RadioGroup>
              <Box w={isSmallScreen ? '50%' : '100%'} mb={theme.spacing?.md}>
                <Input.Wrapper
                  error={stepForms.form.step4.errors.radio1}
                  label={t('step4.customer.radio1.label')}
                  required
                  description={
                    <Group justify="space-between">
                      <Text
                        fz={theme.fontSizes?.sm}
                        ta="center"
                        fw={900}
                        c={theme.colors?.white?.[9]}
                      >
                        {t('step4.customer.radio1.man')}
                        {`: ${stepForms.form.step4.values.radio1 === '' ? 0 : stepForms.form.step4.values.radio1}%`}
                      </Text>
                      <Text
                        fz={theme.fontSizes?.sm}
                        ta="center"
                        fw={900}
                        c={theme.colors?.white?.[9]}
                      >
                        {t('step4.customer.radio1.women')}
                        {`: ${stepForms.form.step4.values.radio1 === '' ? 0 : 100 - parseInt(stepForms.form.step4.values.radio1)}%`}
                      </Text>
                    </Group>
                  }
                >
                  <Slider
                    color={theme.colors?.red?.[0]}
                    size="sm"
                    mb={theme.spacing?.lg}
                    label={(value) => `${value} %`}
                    {...stepForms.form.step4.getInputProps('radio1')}
                    marks={[
                      { value: 20, label: '20%' },
                      { value: 40, label: '40%' },
                      { value: 50, label: '50%' },
                      { value: 60, label: '60%' },
                      { value: 80, label: '80%' },
                    ]}
                  />
                </Input.Wrapper>
              </Box>
              <RadioGroup
                label={t('step4.customer.radio3.label')}
                {...stepForms.form.step4.getInputProps('radio3')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Moins du Baccalaureat"
                  label={t('step4.customer.radio3.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Baccalaureat ou equivalent"
                  label={t('step4.customer.radio3.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Pas de diplome"
                  label={t('step4.customer.radio3.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Licence"
                  label={t('step4.customer.radio3.option4')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Master"
                  label={t('step4.customer.radio3.option5')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Plus que le Master"
                  label={t('step4.customer.radio3.option6')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Critère pas relevant"
                  label={t('step4.customer.radio3.option7')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.customer.radio4.label')}
                {...stepForms.form.step4.getInputProps('radio4')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Marié"
                  label={t('step4.customer.radio4.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Divorcé"
                  label={t('step4.customer.radio4.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Separé"
                  label={t('step4.customer.radio4.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Veuf/veuve"
                  label={t('step4.customer.radio4.option4')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Pas marié"
                  label={t('step4.customer.radio4.option5')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Critère pas relevant"
                  label={t('step4.customer.radio4.option6')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.customer.radio5.label')}
                {...stepForms.form.step4.getInputProps('radio5')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Employe plein temps"
                  label={t('step4.customer.radio5.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Employe temps partiel"
                  label={t('step4.customer.radio5.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Pas d'emploie"
                  label={t('step4.customer.radio5.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Auto emploie"
                  label={t('step4.customer.radio5.option4')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Menagères"
                  label={t('step4.customer.radio5.option5')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Etudiant"
                  label={t('step4.customer.radio5.option6')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Retraite"
                  label={t('step4.customer.radio5.option7')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Critère pas relevant"
                  label={t('step4.customer.radio5.option8')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.customer.radio6.label')}
                {...stepForms.form.step4.getInputProps('radio6')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Moins de 100 000 XAF/Mois"
                  label={t('step4.customer.radio6.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="101 000 – 300 000 XAF/Mois"
                  label={t('step4.customer.radio6.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="301 000 - 500 000 XAF/Mois"
                  label={t('step4.customer.radio6.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Plus de 501 000 XAF/Mois"
                  label={t('step4.customer.radio6.option4')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Pas de revenu mensuel"
                  label={t('step4.customer.radio6.option5')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Critère pas relevant"
                  label={t('step4.customer.radio6.option6')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.customer.radio7.label')}
                {...stepForms.form.step4.getInputProps('radio7')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="1 personne"
                  label={t('step4.customer.radio7.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="2-5 personnes"
                  label={t('step4.customer.radio7.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="6-10 personnes"
                  label={t('step4.customer.radio7.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Plus de 10 personne"
                  label={t('step4.customer.radio7.option4')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Critere pas relevant"
                  label={t('step4.customer.radio7.option5')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.customer.radio8.label')}
                {...stepForms.form.step4.getInputProps('radio8')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Parent"
                  label={t('step4.customer.radio8.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="En attente d'enfant"
                  label={t('step4.customer.radio8.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Pas parent"
                  label={t('step4.customer.radio8.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Critere pas relevant"
                  label={t('step4.customer.radio8.option4')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.customer.radio9.label')}
                {...stepForms.form.step4.getInputProps('radio9')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Proprietaire de maison"
                  label={t('step4.customer.radio9.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="En location"
                  label={t('step4.customer.radio9.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="En co-location"
                  label={t('step4.customer.radio9.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Vit en famille"
                  label={t('step4.customer.radio9.option4')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Critere pas relevant"
                  label={t('step4.customer.radio9.option5')}
                />
              </RadioGroup>
              <Text fz={theme.fontSizes?.md} ta="center" fw={900} c={theme.colors?.red?.[0]}>
                {t('step4.customer.subtitle2')}
              </Text>
              <RadioGroup
                label={t('step4.customer.radio10.label')}
                {...stepForms.form.step4.getInputProps('radio10')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Oui"
                  label={t('step4.customer.radio10.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Non"
                  label={t('step4.customer.radio10.option2')}
                />
              </RadioGroup>
              <Textarea
                label={t('step4.customer.input.label')}
                py={theme.spacing?.md}
                autosize
                withAsterisk
                disabled={
                  stepForms.form.step4.values.radio10 === 'Non' ||
                  stepForms.form.step4.values.radio10 === undefined
                }
                minRows={3}
                placeholder={t('step4.customer.input.placeholder')}
                {...stepForms.form.step4.getInputProps('input')}
                fw="bold"
                size="sm"
              />
              <RadioGroup
                label={t('step4.customer.radio11.label')}
                {...stepForms.form.step4.getInputProps('radio11')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Supermarche/Superette"
                  label={t('step4.customer.radio11.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Boutique de quartier"
                  label={t('step4.customer.radio11.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Marche traditionnel"
                  label={t('step4.customer.radio11.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Dans la rue"
                  label={t('step4.customer.radio11.option4')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="en ligne"
                  label={t('step4.customer.radio11.option5')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.customer.radio12.label')}
                {...stepForms.form.step4.getInputProps('radio12')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Jour"
                  label={t('step4.customer.radio12.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Semaine"
                  label={t('step4.customer.radio12.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Bi-mensuel"
                  label={t('step4.customer.radio12.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Mensuel"
                  label={t('step4.customer.radio12.option4')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Moins frequement"
                  label={t('step4.customer.radio12.option5')}
                />
              </RadioGroup>
              <RadioGroup
                label={t('step4.customer.radio13.label')}
                {...stepForms.form.step4.getInputProps('radio13')}
                withAsterisk
                mb={theme.spacing?.sm}
              >
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Pulsif ( pour un besoin urgent)"
                  label={t('step4.customer.radio13.option1')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Plannifie ( defini sur des periodes)"
                  label={t('step4.customer.radio13.option2')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Specifique ( pas frequents qui necessite longue reflexion)"
                  label={t('step4.customer.radio13.option3')}
                />
                <Radio
                  mb={theme.spacing?.sm}
                  fw="bold"
                  variant="outline"
                  color={theme.colors?.red?.[0]}
                  value="Non recherche ( comble un besoin non exprime)"
                  label={t('step4.customer.radio13.option4')}
                />
              </RadioGroup>
            </form>
          </>
        )}
      </Box>
    );
  };
  const step5 = () => {
    return (
      <Box miw="100%">
        <Text fz={theme.fontSizes?.md} ta="center" fw={900} c={theme.colors?.red?.[0]}>
          {t('step5.subtitle3')}
        </Text>
        <form>
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step5.input1.label')}
            placeholder={t('step5.input1.placeholder')}
            {...stepForms.form.step5.getInputProps('input1')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step5.input2.label')}
            placeholder={t('step5.input2.placeholder')}
            {...stepForms.form.step5.getInputProps('input2')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step5.input3.label')}
            placeholder={t('step5.input3.placeholder')}
            {...stepForms.form.step5.getInputProps('input3')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step5.input4.label')}
            placeholder={t('step5.input4.placeholder')}
            {...stepForms.form.step5.getInputProps('input4')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step5.input5.label')}
            placeholder={t('step5.input5.placeholder')}
            {...stepForms.form.step5.getInputProps('input5')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step5.input6.label')}
            placeholder={t('step5.input6.placeholder')}
            {...stepForms.form.step5.getInputProps('input6')}
            withAsterisk
            mb={theme.spacing?.sm}
          />

          <Text fz={theme.fontSizes?.md} ta="center" fw={900} c={theme.colors?.red?.[0]}>
            {t('step5.subtitle4')}
          </Text>

          {/* Radios for company evaluation */}
          <RadioGroup
            label={t('step5.radio1.label')}
            {...stepForms.form.step5.getInputProps('radio1')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très bas"
              label={t('step5.radio1.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Bas"
              label={t('step5.radio1.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Abordable"
              label={t('step5.radio1.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Chère"
              label={t('step5.radio1.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très chère"
              label={t('step5.radio1.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio2.label')}
            {...stepForms.form.step5.getInputProps('radio2')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très mauvais"
              label={t('step5.radio2.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Mauvais"
              label={t('step5.radio2.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Bon"
              label={t('step5.radio2.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très bien"
              label={t('step5.radio2.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Excellent"
              label={t('step5.radio2.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio3.label')}
            {...stepForms.form.step5.getInputProps('radio3')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très insatisfait"
              label={t('step5.radio3.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Pas satisfait"
              label={t('step5.radio3.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Moyen"
              label={t('step5.radio3.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Satisfait"
              label={t('step5.radio3.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très satisfait"
              label={t('step5.radio3.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio4.label')}
            {...stepForms.form.step5.getInputProps('radio4')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très mauvais choix"
              label={t('step5.radio4.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Mauvais choix"
              label={t('step5.radio4.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Neutre"
              label={t('step5.radio4.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Bon choix"
              label={t('step5.radio4.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très bon choix"
              label={t('step5.radio4.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio5.label')}
            {...stepForms.form.step5.getInputProps('radio5')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très mauvais"
              label={t('step5.radio5.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Mauvais"
              label={t('step5.radio5.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Moyen"
              label={t('step5.radio5.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Bon"
              label={t('step5.radio5.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très bon"
              label={t('step5.radio5.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio6.label')}
            {...stepForms.form.step5.getInputProps('radio6')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très difficile"
              label={t('step5.radio6.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Difficile"
              label={t('step5.radio6.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Moyen"
              label={t('step5.radio6.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Facile"
              label={t('step5.radio6.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très facile"
              label={t('step5.radio6.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio7.label')}
            {...stepForms.form.step5.getInputProps('radio7')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très mauvaise"
              label={t('step5.radio7.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Mauvaise"
              label={t('step5.radio7.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Moyenne"
              label={t('step5.radio7.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Bonne"
              label={t('step5.radio7.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très bonne"
              label={t('step5.radio7.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio8.label')}
            {...stepForms.form.step5.getInputProps('radio8')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très difficilement"
              label={t('step5.radio8.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Difficilement"
              label={t('step5.radio8.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Moyennement"
              label={t('step5.radio8.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Facilement"
              label={t('step5.radio8.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très facilement"
              label={t('step5.radio8.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio9.label')}
            {...stepForms.form.step5.getInputProps('radio9')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Pas necessaire"
              label={t('step5.radio9.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Peut-être"
              label={t('step5.radio9.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Important"
              label={t('step5.radio9.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très Important"
              label={t('step5.radio9.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Incontournable"
              label={t('step5.radio9.option5')}
            />
          </RadioGroup>

          <RadioGroup
            label={t('step5.radio10.label')}
            {...stepForms.form.step5.getInputProps('radio10')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très quelconque"
              label={t('step5.radio10.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Quelconque"
              label={t('step5.radio10.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Commun"
              label={t('step5.radio10.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Unique"
              label={t('step5.radio10.option4')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              variant="outline"
              mb={theme.spacing?.sm}
              value="Très Unique"
              label={t('step5.radio10.option5')}
            />
          </RadioGroup>
        </form>
      </Box>
    );
  };
  const step6 = () => {
    return (
      <Box miw="100%">
        <Text fz={theme.fontSizes?.md} ta="center" fw={900} c={theme.colors?.red?.[0]}>
          {t('step6.subtitle5')}
        </Text>
        <form>
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step6.input1.label')}
            placeholder={t('step6.input1.placeholder')}
            {...stepForms.form.step6.getInputProps('input1')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step6.input2.label')}
            placeholder={t('step6.input2.placeholder')}
            {...stepForms.form.step6.getInputProps('input2')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
          {/* Educational Background */}
          <RadioGroup
            label={t('step6.radio1.label')}
            {...stepForms.form.step6.getInputProps('radio1')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="Management and Administration"
              label={t('step6.radio1.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="Engineer"
              label={t('step6.radio1.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="Self-taught"
              label={t('step6.radio1.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="Other"
              label={t('step6.radio1.option4')}
            />
          </RadioGroup>

          {/* Years of Experience */}
          <RadioGroup
            label={t('step6.radio2.label')}
            {...stepForms.form.step6.getInputProps('radio2')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="0-3 years"
              label={t('step6.radio2.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="4-10 years"
              label={t('step6.radio2.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="More than 10 years"
              label={t('step6.radio2.option3')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="Other"
              label={t('step6.radio2.option4')}
            />
          </RadioGroup>
          <Text fz={theme.fontSizes?.md} ta="center" fw={900} c={theme.colors?.red?.[0]}>
            {t('step6.subtitle5')}
          </Text>
          <TextInput
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step6.input3.label')}
            placeholder={t('step6.input3.placeholder')}
            {...stepForms.form.step6.getInputProps('input3')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
          <RadioGroup
            label={t('step6.radio3.label')}
            {...stepForms.form.step6.getInputProps('radio3')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="Less than 3 years"
              label={t('step6.radio3.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="3-5 years"
              label={t('step6.radio3.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="More than 5 years"
              label={t('step6.radio3.option3')}
            />
          </RadioGroup>

          {/* Number of Employees */}
          <RadioGroup
            label={t('step6.radio4.label')}
            {...stepForms.form.step6.getInputProps('radio4')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="1-3 employees"
              label={t('step6.radio4.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="4-10 employees"
              label={t('step6.radio4.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="More than 10 employees"
              label={t('step6.radio4.option3')}
            />
          </RadioGroup>

          {/* Industry Sector */}
          <RadioGroup
            label={t('step6.radio5.label')}
            {...stepForms.form.step6.getInputProps('radio5')}
            withAsterisk
            mb={theme.spacing?.sm}
          >
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="1-3 employees"
              label={t('step6.radio5.option1')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="4-10 employees"
              label={t('step6.radio5.option2')}
            />
            <Radio
              color={theme.colors?.red?.[0]}
              mb={theme.spacing?.sm}
              variant="outline"
              value="More than 10 employees"
              label={t('step6.radio5.option3')}
            />
          </RadioGroup>
          {/* Location */}
          <TextInput
            label={t('step6.input4.label')}
            w={isSmallScreen ? '50%' : '100%'}
            placeholder={t('step6.input4.placeholder')}
            {...stepForms.form.step6.getInputProps('input4')}
            withAsterisk
            mb={theme.spacing?.sm}
          />

          {/* Product/Service Image */}
          <FileInput
            leftSection={icon}
            w={isSmallScreen ? '50%' : '100%'}
            label={t('step6.input5.label')}
            placeholder={t('step6.input5.placeholder')}
            {...stepForms.form.step6.getInputProps('input5')}
            withAsterisk
            mb={theme.spacing?.sm}
          />
        </form>
      </Box>
    );
  };
  return (
    <Container pt={theme.spacing?.lg} size={isSmallScreen ? '60%' : '90%'}>
      {currentStep === 'step2' && (
        <Box style={{ borderWidth: 1, borderColor: '#EF1D1E', borderStyle: 'solid' }}>
          <Text
            fz={isSmallScreen ? theme.fontSizes?.lg : theme.fontSizes?.md}
            ta="center"
            c={theme.colors?.red?.[0]}
            fw={900}
          >
            Market Scorecard
          </Text>
          <Text
            fz={isSmallScreen ? theme.fontSizes?.md : theme.fontSizes?.sm}
            ta="center"
            c={theme.colors?.red?.[0]}
            fw={900}
          >
            {t('question')}
          </Text>
        </Box>
      )}
      <Box
        bg={theme.colors?.white?.[7]}
        mt={theme.spacing?.md}
        px={theme.spacing?.md}
        mih={isSmallScreen ? (currentStep === 'step2' ? 380 : 480) : '65vh'}
        mah={isSmallScreen ? 480 : '100%'}
        style={{ overflow: 'scroll', justifyContent: 'center', alignContent: 'center' }}
      >
        <Center>
          {currentStep === 'step1' && step1()}
          {currentStep === 'confirmationStep' && confirmationStep()}
          {currentStep === 'step2' && step2()}
          {currentStep === 'step3' && step3()}
          {currentStep === 'step4' && step4()}
          {currentStep === 'step5' && step5()}
          {currentStep === 'step6' && step6()}
        </Center>
      </Box>
      <Group
        pos="relative"
        py={theme.spacing?.md}
        justify={currentStep !== 'step1' && currentStep !== 'step2' ? 'space-between' : 'center'}
      >
        {currentStep !== 'step1' && currentStep !== 'step2' && (
          <Button
            h={50}
            w={isSmallScreen ? 250 : 100}
            color={theme.colors?.red?.[0]}
            disabled={currentStep === 'step1' || currentStep === 'step2'}
            onClick={() => previousButton()}
          >
            <Text
              fz={isSmallScreen ? theme.fontSizes?.md : theme.fontSizes?.sm}
              fw={400}
              ta="center"
            >
              {t('button.previous')}
            </Text>
          </Button>
        )}
        <Button
          loading={currentStep === 'step1' ? isLoading : false}
          type="submit"
          onClick={nextButton}
          h={50}
          w={isSmallScreen ? 250 : 100}
          color={theme.colors?.red?.[0]}
        >
          <Text fz={isSmallScreen ? theme.fontSizes?.md : theme.fontSizes?.sm} fw={400} ta="center">
            {isLoading && currentStep === 'step1' ? (
              <Loader size={30} c={theme.colors?.white?.[0]} />
            ) : (
              t('button.next')
            )}
          </Text>
        </Button>
      </Group>
    </Container>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale = 'fr' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer', 'form'])),
      // Will be passed to the page component as props
    },
  };
};
// 44012108568
