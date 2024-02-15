import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const RecommendationCard = ({ pair }) => {
  const [isDescOpen, setIsDescOpen] = useState(false);
  const toggleDesc = () => {
    setIsDescOpen((prev) => !prev);
  };
  
  return (
    <Grid xs={6}>
      <Card sx={{ border: 1, maxWidth: 200 }}>
        <CardContent>
          <Typography variant="body1" fontSize="30">
            Product: {pair[0]}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={toggleDesc}>
            {"Click to View Desc!"}
          </Button>
        </CardActions>
        <Dialog open={isDescOpen} onClose={toggleDesc} fullWidth>
          <DialogTitle>{`Product Desc For "${pair[0]}":`}</DialogTitle>
          <DialogContent>
            <Typography variant="body2">{pair[1]}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleDesc}>{"Hide Desc!"}</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default RecommendationCard;
