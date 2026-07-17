import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/projects';

const Projects = () => {
  return (
    <section id="projects" className="relative bg-transparent px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-orange-400/30 bg-black/20 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm">
            <img
              src="/images/profile.jpg"
              alt="John Lloyd Galito"
              className="h-10 w-10 rounded-full border border-orange-400/40 object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-white">Projects from my GitHub</p>
              <p className="text-xs text-slate-400">@Kuyalloyd</p>
            </div>
          </div>

          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            These are the projects currently represented by the GitHub work linked
            in this portfolio.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.length === 0 ? (
            <div className="rounded-[1.6rem] border border-orange-500/15 bg-[linear-gradient(180deg,rgba(30,14,10,0.9),rgba(17,10,8,0.94))] p-10 text-center">
              <p className="text-lg font-semibold text-white">No projects added yet</p>
              <p className="mt-2 text-gray-400">When you’re ready, add your GitHub repos and they’ll show up here.</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-[1.6rem] border border-orange-500/15 bg-[linear-gradient(180deg,rgba(30,14,10,0.9),rgba(17,10,8,0.94))] shadow-[0_25px_80px_rgba(0,0,0,0.28)]"
              >
              <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />


              <div className="grid grid-cols-1 gap-0 md:grid-cols-[1.35fr_0.65fr]">
                <div className="p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`rounded-full bg-gradient-to-r ${project.color} px-3 py-1 text-xs font-semibold text-white`}>
                      {project.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="mt-4 leading-relaxed text-gray-300">{project.description}</p>

                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-orange-400 transition-all hover:text-orange-300"
                    >
                      <FaGithub className="text-lg" />
                      View Code
                    </motion.a>

                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 text-green-400 transition-all hover:text-green-300"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="relative flex min-h-[220px] items-end overflow-hidden border-t border-white/5 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_40%),linear-gradient(180deg,_rgba(19,10,8,0.6),_rgba(10,6,5,0.95))] p-8 md:min-h-full md:border-l md:border-t-0">
                  <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-orange-500/20 blur-2xl" />
                  <div className="relative space-y-5">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                      <img
                        src="/images/profile.jpg"
                        alt="John Lloyd Galito"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Built by</p>
                        <p className="text-sm font-semibold text-white">John Lloyd</p>
                      </div>
                    </div>

                    <div className="max-w-[14rem]">
                      <p className="text-sm text-slate-400">GitHub repository</p>
                      <p className="mt-1 break-words text-sm font-medium text-slate-200">
                        {project.githubLink.replace('https://github.com/', '')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default Projects;
