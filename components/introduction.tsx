import { Card, CardHeader, CardBody, CardFooter, Button, Text, Grid } from '@nextui-org/react';

const MechanicDescription = () => {
  return (
    <Card style={{ padding: '$6', minWidth: '600px', margin: '0 auto' }}>
      <CardHeader>
        <Text
          h2
          css={{
            textGradient: '45deg, $blue600 -20%, $green600 50%',
            fontWeight: 'bold',
          }}
        >
          Welcome to [Your Mechanic's Name] Auto Care
        </Text>
      </CardHeader>
      <CardBody>
        <Text css={{ lineHeight: '1.8' }}>
          Hey there! I’m <strong>[Your Name]</strong>, your friendly neighborhood car mechanic. Whether your car needs a quick tune-up, a major repair, or just some TLC, I’ve got you covered. I offer two convenient ways to serve you:
        </Text>
        <Grid.Container gap={1} css={{ mt: '$5' }}>
          <Grid xs={12}>
            <Text weight="bold" css={{ color: '$blue600' }}>
              1. At My Workshop:
            </Text>
            <Text css={{ ml: '$2' }}>
              Drop by my fully equipped garage for top-notch service in a comfortable, no-fuss environment.
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text weight="bold" css={{ color: '$green600' }}>
              2. At Your Doorstep:
            </Text>
            <Text css={{ ml: '$2' }}>
              Can’t make it to me? No problem! I’ll come to your home or office and get your car running smoothly right where you are.
            </Text>
          </Grid>
        </Grid.Container>
        <Text css={{ mt: '$5', lineHeight: '1.8' }}>
          With years of experience, a passion for cars, and a commitment to honest, affordable service, I’m here to keep you and your vehicle on the road. Let’s make car care simple, stress-free, and personal!
        </Text>
      </CardBody>
      <CardFooter>
        <Button
          color="primary"
          style={{ margin: 'auto', fontWeight: '$bold' }}
          onPress={() => alert('Call now!')}
        >
          📞 Call Me Today
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MechanicDescription;