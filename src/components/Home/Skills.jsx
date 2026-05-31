import React from 'react';
import SkillsHeader from './SkillsHeader';
import SkillsImages from './SkillsImages';

const Skills = ({ skills }) => {
  return (
    <div className="skills" id="skills">
      <SkillsHeader />
      <SkillsImages skills={skills} />
    </div>
  );
};

export default Skills;