import { MutableRefObject } from 'react';
import NextImage from 'next/legacy/image';
import Link from 'next/link';
import { IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { Box, Center, Group, Stack, Text } from '@mantine/core';
import { theme } from '@/theme';
import call from '../../public/images/call.png';
import facebook from '../../public/images/communication.png';
import linkedin from '../../public/images/linkedin.png';
import mail from '../../public/images/mail.png';
import classes from './footer.module.css';
import { useMediaQuery } from '@mantine/hooks';

export default function Footer(props: { footerRef?: React.RefObject<HTMLDivElement> }) {
  const { t } = useTranslation('common');
  const isSmallScreen = useMediaQuery('(min-width: 576px)');
  const socialsLinks = [
    {
      link: '',
      icon: facebook,
    },
    {
      link: '',
      icon: linkedin,
    },
    {
      link: '',
      icon: mail,
    },
  ];
  return (
    <Box>
      <Box py={theme.spacing?.sm} bg={theme.colors?.white?.[8]}>
        {isSmallScreen ? (
          <Group justify="space-around" align="center" gap={15}>
            <Group align="center">
              {socialsLinks.map((social, index) => (
                <Link key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                  <NextImage src={social.icon} width={isSmallScreen ? 20 : 20} height={isSmallScreen ? 20 : 20} />
                </Link>
              ))}
            </Group>
            <Group align="center" gap={3}>
              <NextImage src={call} width={isSmallScreen ? 20 : 20} height={isSmallScreen ? 20 : 20} />
              <Text fz={theme.fontSizes?.sm}>
                +237 678 452 245
              </Text>
            </Group>
          </Group>
        ) : (
          <Center>
            <Stack align='center' justify='center' gap={5}>
              <Group align="center">
                {socialsLinks.map((social, index) => (
                  <Link key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                    <NextImage src={social.icon} width={isSmallScreen ? 20 : 20} height={isSmallScreen ? 20 : 20} />
                  </Link>
                ))}
              </Group>
              <Group align="center" gap={3}>
                <NextImage src={call} width={isSmallScreen ? 20 : 20} height={isSmallScreen ? 20 : 20} />
                <Text fz={theme.fontSizes?.sm}>
                  +237 678 452 245
                </Text>
              </Group>
            </Stack>
          </Center>
        )}
      </Box>
      <Box py={theme.spacing?.sm} bg={theme.colors?.white?.[9]}>
        <Text ta="center" fz={theme.fontSizes?.sm} c={theme.colors?.white?.[0]}>
          © Copyright 2024 Optimus marketing
        </Text>
        <Text ta="center" fz={theme.fontSizes?.xs} c={theme.colors?.white?.[0]}>
          Designed by{' '}
          <Link style={{textDecoration: "none"}} href="https://nobisoft.net" rel="noopener noreferrer" target="_blank">
            <Text c={theme.colors?.white?.[0]} fz={theme.fontSizes?.xs} component="span">Nobisoft</Text>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
