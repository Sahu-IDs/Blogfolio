import { Grid, Avatar, Typography, Box } from "@mui/material";
import skills from "../data/skillsData";

const Experience = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Experience
      </Typography>
      <Typography variant="body2" mb={3}>
        I've more than 2 years of experience in below technologies.
      </Typography>

      <Grid container spacing={3}>
        {skills.map((skill, i) => (
          <Grid item xs={6} sm={4} md={2} key={i}>
            <Box textAlign="center">
              <Avatar
                src={skill.icon}
                sx={{ width: 80, height: 80, margin: "auto", boxShadow: 3 }}
              />
              <Typography mt={1}>{skill.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Experience;