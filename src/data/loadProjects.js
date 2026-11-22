// This is NOT the project data — it is only a loader.
// The single source of truth for all projects is:
//   src/assets/project_data/data.json
// Edit that file to add/remove projects, change links, reorder,
// or toggle visibility via "mainPageShow" / "projectPageShow".
import rawData from '../assets/project_data/data.json';

import openwhisprBanner from '../assets/project_png/openwhispr-showcase.png';
import deepResearchBanner from '../assets/project_png/deepresearch-showcase.png';
import reelflowBanner from '../assets/project_png/reelflow-showcase.png';
import bunkmaitBanner from '../assets/project_png/bunkmait-showcase.png';
import liveTextOcrBanner from '../assets/project_png/live-text-ocr-showcase.png';
import aiFillerBanner from '../assets/project_png/ai-filler-showcase.png';
import medScrapperBanner from '../assets/project_png/medscrapper-showcase.png';
import restockerBanner from '../assets/project_png/restocker-showcase.png';
import addyBitesBanner from '../assets/project_png/addybites-showcase-wide.png';
import portfolioBanner from '../assets/project_png/image.png';
import motiaBanner from '../assets/project_png/motia-showcase.png';
import fireshieldBanner from '../assets/project_png/fireshield-showcase.png';
import nexgenqueryBanner from '../assets/project_png/nexgenquery-showcase.png';
import dsdBanner from '../assets/project_png/dsd-showcase.png';
import lineFollowerBanner from '../assets/project_png/line-follower-alpha.png';
import unlimitedStorageBanner from '../assets/project_png/unlimited-storage-showcase.png';
import opencodebotBanner from '../assets/project_png/opencodebot-showcase.svg';

const imageMap = {
  openwhisprBanner,
  deepResearchBanner,
  reelflowBanner,
  bunkmaitBanner,
  liveTextOcrBanner,
  aiFillerBanner,
  medScrapperBanner,
  restockerBanner,
  addyBitesBanner,
  portfolioBanner,
  motiaBanner,
  fireshieldBanner,
  nexgenqueryBanner,
  dsdBanner,
  lineFollowerBanner,
  unlimitedStorageBanner,
  opencodebotBanner,
};

export const projectsData = [...rawData]
  .sort((a, b) => (a.index ?? Infinity) - (b.index ?? Infinity))
  .map((project) => {
    const videoUrl = project['project video:'] || project['project video'] || project.projectVideo || project.video;
    return {
      ...project,
      image: imageMap[project.image] || project.image,
      video: videoUrl || null,
      'project video:': videoUrl || null,
    };
  });

export const shortTitle = (title) => title.split(/:| - | – | — /)[0];
