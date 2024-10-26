import { GetStaticProps } from 'next';
import NextImage from 'next/legacy/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, Button, Center, Container, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { theme } from '@/theme';
import image from '../public/images/evaluate.png';

export default function WhyEvaluate() {
  const isSmallScreen = useMediaQuery('(min-width: 576px)');
  const { t } = useTranslation('home');
  return (
    <Box mih={550} pt={theme.spacing?.lg}>
      <Container size={isSmallScreen ? '80%' : '90%'}>
        <Center>
          <Box>
            <Text fz={theme.fontSizes?.md} ta="center" c={theme.colors?.red?.[0]} fw={400}>
              {t('evaluate.title')}
            </Text>
            <Center>
              <NextImage src={image} style={{ width: 500, height: 500 }} alt="" />
            </Center>
            <Text fz={theme.fontSizes?.md} ta="center" c="dark">
              {t('evaluate.text')}
            </Text>
            <Center mt={theme.spacing?.xl}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button
                  my={theme.spacing?.sm}
                  fullWidth
                  h={50}
                  w={isSmallScreen ? 250 : 150}
                  color={theme.colors?.red?.[0]}
                >
                  <Text
                    fz={isSmallScreen ? theme.fontSizes?.md : theme.fontSizes?.md}
                    fw={600}
                    ta="center"
                  >
                    {t('evaluate.button')}
                  </Text>
                </Button>
              </Link>
            </Center>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale = 'fr' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer', 'home'])),
      // Will be passed to the page component as props
    },
  };
};
