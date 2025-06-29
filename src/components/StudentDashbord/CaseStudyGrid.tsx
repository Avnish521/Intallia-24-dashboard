
import React from "react";
import { CaseStudyCard } from "./CaseStudyCard";
import { caseStudies } from "@/data/caseStudy"; // Assuming you have a data file for case studies


export const CaseStudyGrid: React.FC = () => {
  return (
    <main className="flex-1 py-10 lg:py-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study, index) => (
          <div key={index} className="h-full">
            <CaseStudyCard {...study} />
          </div>
        ))}
      </div>
    </main>
  );
};
