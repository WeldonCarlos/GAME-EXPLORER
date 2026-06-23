import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

interface GameCardProps {
  name: string;
  image: string;
  released: string;
}

export function GameCard({
  name,
  image,
  released,
}: GameCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        backgroundColor: "background.paper",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all .3s ease",

        "&:hover": {
          transform: "scale(1.05)",
          cursor: "pointer",
          boxShadow: 8,
        },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={image}
        alt={name}
      />

      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          noWrap
        >
          {name}
        </Typography>

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Lançamento
          </Typography>

          <Typography variant="body1">
            {released || "Não informado"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}