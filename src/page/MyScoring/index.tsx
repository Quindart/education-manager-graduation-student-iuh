import React, { useState } from 'react';
import ScoreManagementExcel from '../ScoreManagementExcel';
import { Box, Paper, Tab } from '@mui/material';

function MyScoringPage() {
  return (
    <Paper elevation={0}>
      <ScoreManagementExcel />
    </Paper>
  );
}

export default MyScoringPage;
