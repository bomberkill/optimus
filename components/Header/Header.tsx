import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Box, Burger, Center, Container, Drawer, Group, Stack, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { theme } from '@/theme';
import fr from '../../public/images/france.png';
import logo from '../../public/images/Group 4.png';
import en from '../../public/images/united-kingdom.png';

// import classes from './header.module.css';

export default function Header() {
  const [opened, { close, toggle }] = useDisclosure(false);
  const { t, i18n } = useTranslation('common');
  const isSmallScreen = useMediaQuery('(min-width: 576px)');
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isFrench, setIsFrench] = useState(false);
  const changLang = (lang: 'en' | 'fr') => {
    i18n.changeLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };
  useEffect(() => {
    i18n.language === 'fr' ? setIsFrench(true) : setIsFrench(false);
  }, [i18n.language]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Box
        style={{ zIndex: 100 }}
        pos={!isSmallScreen ? 'relative' : scrolled ? 'fixed' : 'relative'}
        w="100%"
      >
        <header
          style={{
            boxShadow: scrolled ? '2px 2px 2px 0 rgba(0, 0, 0, 0.3)' : '',
            height: isSmallScreen ? '8vh' : '6vh',
            backgroundColor: '#EF1D1E',
            width: '100%',
            // position: 'fixed',
            top: 0,
          }}
        >
          <Container h="100%" size="90%">
            {/* <Group justify="flex-end">
              <NextImage src={logo} alt="" />
            </Group> */}
            {isSmallScreen ? (
              <Group h="100%" align="center" justify="space-between">
                <Group justify="start">
                  <Link style={{ textDecoration: 'none' }} href="/">
                    <Text style={{ cursor: 'pointer' }} c={theme.colors?.white?.[0]}>
                      {t('home')}
                    </Text>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="about-us">
                    <Text style={{ cursor: 'pointer' }} c={theme.colors?.white?.[0]}>
                      {t('about-us')}
                    </Text>
                  </Link>
                </Group>
                <Box style={{ backgroundColor: 'white', borderRadius: 5 }} p={theme.spacing?.xs}>
                  <Group align="center" justify="space-between">
                    <Group onClick={() => changLang('fr')} style={{ cursor: 'pointer' }} gap={5}>
                      <Text
                        fz={theme.fontSizes?.sm}
                        c={isFrench ? theme.colors?.red?.[0] : theme.colors?.white?.[9]}
                        fw={400}
                      >
                        FR
                      </Text>
                      <NextImage style={{ height: 20, width: 20 }} src={fr} alt="" />
                    </Group>
                    <Text fz="sm" c={theme.colors?.white?.[9]} fw={600}>
                      |
                    </Text>
                    <Group onClick={() => changLang('en')} style={{ cursor: 'pointer' }} gap={5}>
                      <Text
                        fz={theme.fontSizes?.sm}
                        c={isFrench ? theme.colors?.white?.[9] : theme.colors?.red?.[0]}
                        fw={400}
                      >
                        EN
                      </Text>
                      <NextImage style={{ height: 20, width: 20 }} src={en} alt="" />
                    </Group>
                  </Group>
                </Box>
              </Group>
            ) : (
              <Group
                h="100%"
                align="center"
                justify={router.pathname !== '/' ? 'space-between' : 'flex-end'}
              >
                {router.pathname !== '/' && (
                  <NextImage
                    style={{ width: 150, height: '100%', objectFit: 'contain' }}
                    src={logo}
                    alt=""
                  />
                )}
                <Group justify="space-between">
                  <Box
                    style={{ backgroundColor: 'white', borderRadius: 5 }}
                    px={theme.spacing?.sm}
                    py={theme.spacing?.xs}
                  >
                    <Group align="center" justify="space-between">
                      <Group
                        onClick={() => {
                          i18n.language === 'en' ? changLang('fr') : changLang('en');
                        }}
                        style={{ cursor: 'pointer' }}
                        gap={2}
                      >
                        <Text fz={theme.fontSizes?.sm} c={theme.colors?.white?.[9]} fw={400}>
                          {i18n.language === 'en' ? 'FR' : 'EN'}
                        </Text>
                        <NextImage
                          style={{ height: 20, width: 20 }}
                          src={i18n.language === 'en' ? fr : en}
                          alt=""
                        />
                      </Group>
                    </Group>
                  </Box>
                  <Burger
                    color={theme.colors?.white?.[0]}
                    size="sm"
                    opened={opened}
                    onClick={toggle}
                    aria-label="Toggle navigation"
                  />
                  <Drawer closeOnClickOutside size={200} opened={opened} onClose={close}>
                    <Stack px={20} gap={15}>
                      <Link style={{ textDecoration: 'none' }} href="/">
                        <Text style={{ cursor: 'pointer' }} c={theme.colors?.white?.[9]} fw="bold">
                          {t('home')}
                        </Text>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="about-us">
                        <Text style={{ cursor: 'pointer' }} c={theme.colors?.white?.[9]} fw="bold">
                          {t('about-us')}
                        </Text>
                      </Link>
                    </Stack>
                  </Drawer>
                </Group>
              </Group>
            )}
            <Center></Center>
          </Container>
        </header>
      </Box>
    </>
  );
}
