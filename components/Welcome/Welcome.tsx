// import { useTranslation } from 'next-i18next';
import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  // const { t } = useTranslation('common');
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        welcome
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text color="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        text
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        end
      </Text>
    </>
  );
}
