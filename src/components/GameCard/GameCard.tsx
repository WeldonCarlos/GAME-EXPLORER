import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface GameCardProps {
  name: string;
  image: string;
  released: string;
}

export function GameCard({ name, image, released }: GameCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={name}
      />

      <CardContent>
        <Typography variant="h6" noWrap>
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Lançamento: {released || "Não informado"}
        </Typography>
      </CardContent>
    </Card>
  );
}