using AutoMapper;
//project namespaces
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Domain.Activity, Activity>();
        }
    }
}