const JOB_FIELDS = [
  'recrut_pblnt_sn',
  'inst_nm',
  'ncs_cd_nm_lst',
  'hire_type_nm_lst',
  'recrut_se_nm',
  'pbanc_end_ymd',
  'recrut_pbanc_ttl',
  'src_url',
  'aply_qlfc_cn',
  'decimal_day',
].join(',');

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    return response.status(500).json({ error: 'Database configuration is missing.' });
  }

  const jobsUrl = new URL('/rest/v1/jobs', SUPABASE_URL);
  jobsUrl.searchParams.set('select', JOB_FIELDS);
  jobsUrl.searchParams.set('order', 'pbanc_end_ymd.asc.nullslast,recrut_pblnt_sn.asc');
  jobsUrl.searchParams.set('limit', '300');

  try {
    const jobsResponse = await fetch(jobsUrl, {
      headers: { apikey: SUPABASE_SECRET_KEY },
      cache: 'no-store',
    });
    const body = await jobsResponse.json();

    response.setHeader('Cache-Control', 'no-store, max-age=0');
    return response.status(jobsResponse.status).json(body);
  } catch (error) {
    console.error('Failed to fetch jobs from Supabase', error);
    return response.status(502).json({ error: 'Unable to load jobs.' });
  }
}
